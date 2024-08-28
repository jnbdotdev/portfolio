const btnDetails = document.querySelectorAll('.btnSkill');

function showDetails(container) {

    console.log(btnDetails.item);
    switch (container) {
        case 0:
            Swal.fire({
                title: 'Back-End',
                text: 'The back-end is the code that runs on the server, that receives requests from the clients, and contains the logic to send the appropriate data back to the client. The back-end also includes the database, which will persistently store all of the data for the application.',
                icon: 'info',
                confirmButtonText: 'Ook',
                confirmButtonColor: '#680000',
                iconColor: '#ff6b93'
            })
            break;
        case 1:
            Swal.fire({
                title: 'Front-End',
                text: 'A front-end application, commonly known as the interface of an application, is the layer or element that the user has the ability to use, see, and interact with through buttons, images, interactive elements, navigational menus, and text.',
                icon: 'info',
                confirmButtonText: 'Ook',
                confirmButtonColor: '#680000',
                iconColor: '#ff6b93'
            })
            break;
        case 2:
            Swal.fire({
                title: 'Data-Analysis',
                text: 'Data analysis is a comprehensive method of inspecting, cleansing, transforming, and modeling data to discover useful information, draw conclusions, and support decision-making.',
                icon: 'info',
                confirmButtonText: 'Ook',
                confirmButtonColor: '#680000',
                iconColor: '#ff6b93'
            })
            break;
        default:
            break;
    }
}

btnDetails[0].addEventListener('click', () => {
    showDetails(0);
});

btnDetails[1].addEventListener('click', () => {
    showDetails(1);
});

btnDetails[2].addEventListener('click', () => {
    showDetails(2);
});