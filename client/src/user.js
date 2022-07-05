class User {

    constructor(id, firstName, lastName, address, phone, email, hight, weight) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = new Address(address.city, address.street, address.number);
        this.phone = phone;
        this.email = email;
        this.hight = hight;
        this.weight = [];
        this.weight.push(weight);
    }

}