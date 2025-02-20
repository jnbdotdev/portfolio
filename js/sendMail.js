require('dotenv').config()
const { TOKEN, SENDER, RECEIVER } = process.env;
const form = document.querySelector('form');
const senderName = document.getElementById('senderName');
const senderMail = document.getElementById('senderMail');
const senderNumber = document.getElementById('senderNumber');
const subject = document.getElementById('senderSubject');
const message = document.getElementById('senderMessage');

function sendMail(){
const bodyMessage = `Name: ${senderName.value}<br>
                    Email: ${senderMail.value}<br>
                    Phone Number: ${senderNumber.value}<br><br>
                    ${message.value}`;

    Email.send({
        Host : "smtp.elasticemail.com",
        Username : SENDER,
        Password : TOKEN,
        To : RECEIVER,
        From : SENDER,
        Subject : subject.value,
        Body : bodyMessage
    }).then(
      message => {
        if (message == 'OK') {
            Swal.fire({
                title: 'Success',
                text: 'Thank you for sending a message :)',
                icon: 'success',
                confirmButtonText: 'Ook',
                confirmButtonColor: '#680000',
                iconColor: '#ff6b93'
              })
        } else {
            Swal.fire({
                title: 'Oh no',
                text: 'There was an error in the process, a notice was sent to the owner, thanks anyway :)',
                icon: 'error',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#680000',
                iconColor: '#c40000'
              })
        }
      }
    );
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    sendMail();
});