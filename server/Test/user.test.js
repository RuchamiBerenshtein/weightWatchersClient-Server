const userService = require('../services/userService');
const User = require("../models/userModel.js")

const { expect } = require("chai");
const sinon = require("sinon");

describe("User Service Unit Tests", () => {
  afterEach(() => {
    sinon.restore();
  })

  describe("Get User functionality", () => {
    it("should return correct user", async () => {
      const id = 1;
      const userObject = {
            id: 1,
            details: {
                firstName: "Mina",
                lastName: "Levi",
                address: {
                    city: "jerusalem",
                    street: "malhachi",
                    number: "9"
                },
                phone: "0521369874",
                email: "ml@gmail.com",
                hight: "1.70",
                meetings: [
                    {
                        id: 1,
                        weight: "73"
                    },
                    {
                        id: 2,
                        weight: "74"
                    },
                    {
                        id: 3,
                        weight: "70"
                    },
                    {
                        id: 4,
                        weight: "74.04"
                    }
                ]
            },
            diary: []
        }
      sinon.stub(User, 'findOne').returns(userObject);
      const returnedUser = await userService.getById(id);
      expect(returnedUser.details.firstName).to.equal(userObject.details.firstName);
      expect(returnedUser.details.address).to.equal(userObject.details.address);
    });

    it("should give error if invalid if there is no user found with provided id", async () => {
      const id = 1;
      sinon.stub(User, 'findOne').returns(null)
      await userService.getById(id).catch((error) => {
        expect(error.message).to.equal("No user not found with given id")
      });
    });
  });
});