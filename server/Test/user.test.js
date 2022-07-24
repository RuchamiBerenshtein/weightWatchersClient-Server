const userService = require('../services/userService');
const userModel = require('../models/userModel.js')

const { expect } = require('chai');
const sinon = require('sinon');

describe('User Service Unit Tests', () => {
    afterEach(() => {
        sinon.restore();
    })

    describe('Save User functionality', () => {
        it('should successfully add a user if the number of users in the DB with the same email or phone or firstName and lastName is zero', async () => {
            const id = 1;
            const details = {
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
            };
            const diary = [];
            const user = {
                id,
                details,
                diary,
            }

            sinon.stub(userModel, 'countDocuments').returns(0);
            sinon.stub(userModel.prototype, 'save').returns(user);

            const returnedUser = await userService.addUser(user);
            expect(returnedUser.id).to.equal(id);
            expect(returnedUser.details).to.equal(details);
        });
        it('should throw an error if the number of users with the same email or phone or firstName and lastName is not zero', async () => {
            const id = 1;
            const details = {
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
            };
            const diary = [];
            const user = {
                id,
                details,
                diary,
            }

            sinon.stub(userModel, 'countDocuments').returns(1)
            try {
                await userService.addUser(user);
            }

            catch {
                (error) => {
                    expect(error.message).to.equal('User already exists');
                }
            };
        });
    });

    describe('Get User functionality', () => {

        it('getAll users', async () => {
            const usersObject = [{
                id: 1,
                details: {},
                diary: []
            }, {
                id: 1,
                details: {},
                diary: []
            }, {
                id: 1,
                details: {},
                diary: []
            },]
            sinon.stub(userModel, 'find').returns(usersObject);
            const returnedUsers = await userService.getAll();
            expect(returnedUsers.length).to.equal(usersObject.length);
        });

        it('should return correct user', async () => {
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
            sinon.stub(userModel, 'findOne').returns(userObject);
            const returnedUser = await userService.getById(id);
            expect(returnedUser.details.firstName).to.equal(userObject.details.firstName);
            expect(returnedUser.details.address).to.equal(userObject.details.address);
        });

        it('should give error if invalid if there is no user found with provided id', async () => {
            const id = 1;
            sinon.stub(userModel, 'findOne').returns(null);
            try {
                await userService.getById(id)
            }
            catch {
                ((error) => {
                    expect(error.message).to.equal('No user not found with given id')
                })
            };
        });
    });
});