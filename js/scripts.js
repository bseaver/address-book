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

Address.prototype.oneLine = function() {
  var result = "";
  var thisAddress = this;
  ["street", "city", "state"].forEach(function(addressPart) {
    result += (result?", ":"") + thisAddress[addressPart];
  });
  return result;
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

    $(".new-address").each(function() {
      newContact.addresses.push(
        new Address(
          $(this).find("input.new-street").val(),
          $(this).find("input.new-city").val(),
          $(this).find("input.new-state").val()
        )
      )
    });

    $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");

    $(".contact").last().click(function() {
      $("#show-contact").show();
      $("#show-contact h2").text(newContact.firstName);
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);

      $("#show-contact ul").children().remove();
      newContact.addresses.forEach(function(address) {
        $("#show-contact ul").append("<li>" + address.oneLine() + "</li>")
      });
    });

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("#new-addresses").children().remove();
    addAddress();
  });
});
