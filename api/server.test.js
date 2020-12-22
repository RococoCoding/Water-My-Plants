const request = require("supertest");
const server = require("./api/server");
const db = require("../data/dbconfig");
const plantsModels = require("./api/plants/models");
const usersModels = require("./api/users/models");

beforeAll(() => {
  db.migrate.rollback();
  db.migrate.latest();
});
afterAll(async () => {
  await db.destroy();
});


describe("users models", () => {
  describe("getById", () => {
    it("should return a user with the proper id", async () => {
      const returnedUser = await usersModels.getById(1);
      expect(returnedUser).toEqual({ username: "Alice", password: "pass123", telephone: "999-999-9999" });
    });
  });
  describe("getByUsername", () => {
    it("should return a user with the proper username", async () => {
      const returnedUser = await usersModels.getByUsername("Alice");
      expect(returnedUser).toEqual({ username: "Alice", password: "pass123", telephone: "999-999-9999" });
    });
  });
  describe("addUser", () => {
    it("should insert a user in the db", async () => {
      const testUser = { username: "test", password: "test", telephone: "000-000-0000" };
      const newUser = await usersModels.addUser(testUser);
      expect(newUser.username).toBe(testUser.username);
      const retrievedUser = await usersModels.getByUsername(testUser.username);
      expect(retrievedUser.username).toBe(testUser.username);
    });
    it("should throw an error if the user body is missing a username", async () => {
      const noUsername = { password: "test", telephone: "000-000-0000" };

      const newUser = await usersModels.addUser(noUsername);
      expect(newUser).toThrow();
    }); it("should throw an error if the user body is missing a password", async () => {
      const noPassword = { username: "test", telephone: "000-000-0000" };

      const newUser = await usersModels.addUser(noPassword);
      expect(newUser).toThrow();
    }); it("should throw an error if the user body is missing a telephone", async () => {
      const noTelephone = { username: "test", password: "test" };

      const newUser = await usersModels.addUser(noTelephone);
      expect(newUser).toThrow();
    });
  });
  describe("editUser", () => {
    it("should update the user's fields in the db", async () => {
      const testUser = { username: "edited", password: "test", telephone: "000-000-0000" };
      const testId = 1;
      await usersModels.editUser(testId, testUser);
      const editedUser = await usersModels.getById(testId);
      expect(editedUser).toBe({ ...testUser, id: testId });
    });
  });
  describe("deleteUser", () => {
    it("should remove the appropriate user from the db", async () => {
      const testId = 1;
      await usersModels.deleteUser(testId);
      const deletedUser = await usersModels.getById(testId);
      expect(deletedUser).toBe(null);
    });
  });
});

// -------------------------- plants models ----------------------------
describe("plants models", () => {
  describe("getById", () => {
    it("should return a plant with the proper id", async () => {
      const returnedPlant = await usersModels.getById(1);
      expect(returnedPlant).toEqual({ nickname: "Jimmy", species: 'daffodil', frequency: 48, img_url: "http://plantpic.com", user_id: 1 });
    });
  });
  describe("addPlant", () => {
    it("should insert a plant in the db", async () => {
      const testPlant = { nickname: "test plant", species: 'unknown', frequency: 38, img_url: null, user_id: 1 };
      const newPlant = await plantsModels.addPlant(testPlant);
      expect(newPlant.nickname).toBe(testPlant.nickname);
      const retrievedPlant = await plantsModels.getByPlantname(testPlant.nickname);
      expect(retrievedPlant.nickname).toBe(testPlant.nickname);
    });
    it("should throw an error if the plant body is missing a nickname", async () => {
      const noPlantNickname = { species: 'unknown', frequency: 38, img_url: null, user_id: 1 };

      const newPlant = await plantsModels.addPlant(noPlantNickname);
      expect(newPlant).toThrow();
    });
    describe("getPlantsByUser", () => {
      it("should return all plants that belong to the user", async () => {
        const userId = 1;
        const returnedPlants = await plantsModels.getPlantsByUser(userId);
        expect(returnedPlants).toHaveLength(2);
      });
    });
    describe("editPlant", () => {
      it("should update the plant's fields in the db", async () => {
        const testPlant = { id: 1, nickname: "edited", species: 'poppy', frequency: 21, img_url: "http:.//test.com", user_id: 2 };
        await plantsModels.editPlant(testPlant.id, testPlant);
        const editedPlant = await plantsModels.getById(testPlant.id);
        expect(editedPlant).toBe({ ...testPlant, id: testPlant.id });
      });
    });
    describe("deletePlant", () => {
      it("should remove the appropriate plant from the db", async () => {
        const testId = 1;
        await plantsModels.deletePlant(testId);
        const deletedPlant = await plantsModels.getById(testId);
        expect(deletedPlant).toBe(null);
      });
    });
  });
});

// --------------------------------- server ------------------------------------------
describe("server", () => {
  describe("create route", () => {
    
  });
});