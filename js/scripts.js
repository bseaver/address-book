//business logic
function Contact(first, last) {
  this.firstName = first;
  this.lastName = last;
  this.addresses = [];
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

function Address(street, city, state) {
  this.street = street;
  this.city = city;
  this.state = state;
}



// user interface logic
$(document).ready(function() {
  var addressHTML = $("#new-addresses").html();
  var addAddress = function() {
    $("#new-addresses").append(addressHTML);
  }

  $("#add-address").click(function() {
    addAddress();
  });

  $("form#new-contact").submit(function(event) {
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();

    var newContact = new Contact(inputtedFirstName, inputtedLastName);

    $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");

    $(".contact").last().click(function() {
      $("#show-contact").show();
      $("#show-contact h2").text(newContact.firstName);
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
    });

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("#new-addresses").children().remove();
    addAddress();
  });
});
