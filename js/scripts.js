// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, emailHome, addressHome, emailWork, addressWork) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber,
  this.emailHome = emailHome,
  this.addressHome = addressHome,
  this.emailWork = emailWork,
  this.addressWork = addressWork
  // function hideEmpty() {
  //   if (this.addressHome == null) {
  //     $("#address-home").hide;
  //     // this.addressHome.remove();
  //   }
  // }
}

// Contact.prototype.noneEmpty = function() {
//   function clean(noneEmpty) {
      // for(var i = 0; i = 1; i++) {
      //   if (addressHome === null || addressHome === undefined) {
      //     delete addressHome;
        // }
//   }
// }
// }

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// User Interface Logic ---------
var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email-home").html(contact.emailHome);
  $(".address-home").html(contact.addressHome);
  $(".email-work").html(contact.emailWork);
  $(".address-work").html(contact.addressWork);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + contact.id + ">Delete</button>");
  // buttons.append(`<button class='deleteButton' id='${contact.id}'>Delete</button>`);
  if (contact.lastName) {
    $("#plast").show();
  } else {
    $("#plast").hide();
  }
  if (contact.phoneNumber) {
    $("#pphone").show();
  } else {
    $("#pphone").hide();
  }
  if (contact.emailHome) {
    $("#pemail-home").show();
  } else {
    $("#pemail-home").hide();
  }
  if (contact.addressHome) {
    $("#paddress-home").show();
  } else {
    $("#paddress-home").hide();
  }
  if (contact.emailWork) {
    $("#pemail-work").show();
  } else {
    $("#pemail-work").hide();
  }
  if (contact.addresswork) {
    $("#paddress-work").show();
  } else {
    $("#paddress-work").hide();
  }

}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);

  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedAddressHome = $("input#new-homeaddress").val();
    var inputtedEmailHome = $("input#new-homeemail").val();
    var inputtedAddressWork = $("input#new-workaddress").val();
    var inputtedEmailWork = $("input#new-workemail").val();
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmailHome, inputtedAddressHome, inputtedEmailWork, inputtedAddressWork);
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-homeemail").val("");
    $("input#new-homeaddress").val("");
    $("input#new-workemail").val("");
    $("input#new-workaddress").val("");
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);

    if ($("#form-group").val == "") {
      $("form-group").remove();
    }
  })
})
