class User { constructor(name, age, city, interest, pay){
    this.name = name;
    this.age = age;
    this.city = city;
    this.interest = interest;
    this.pay = pay;
    }   
}
// Subclass FreeUser hvor de max kan se 20 matches om dagen.
class FreeUSer extends User{ constructor(name, age, city, interest, pay, image){
    super(name, age, city, interest, pay);
    this.image = image;
    }   maxMatch(number) {
            if(number > 20){
            let newNumb = 20;
            this.match = newNumb;
        }
    }
}
// subclass PaymentUser og dens subclass CreditCards
class PaymentUser extends User{ constructor(name, age, city, interest, pay, image, match){
    super(name, age, city, interest, pay);
    this.image = image;
    this.match = match;
    
    }
}

class CreditCards extends PaymentUser { constructor(name, age, city, interest, pay, image, match, fullName, regnr, accnr, date, cvvnr){
    super(name, age, city, interest, pay, image, match);
    this.fullName = fullName;
    this.regnr = regnr;
    this.accnr = accnr;
    this.date = date;
    this.cvvnr = cvvnr;
    }
}

// Paymentuser + creditcard variabel

let signecredit = new CreditCards('Signe', 28, 'Frederiksberg', 'Football', 'yes', 'B./images/girl.jpg', 25, 'Signe Larsen', 4131, 533085463191, ('2023, 11, 22'), 577);

// Freeuser variabel
let steffan = new FreeUSer('Stefan', 32, 'Kbh', 'Football', 'no','./images/man.png');
steffan.maxMatch(39);

// output
console.log(signecredit);
console.log(steffan);