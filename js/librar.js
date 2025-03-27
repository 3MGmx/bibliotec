document.addEventListener('DOMContentLoaded', () => {
    const bookForm = document.getElementById('formularioLibro');
    const listaLibros = document.getElementById('listaLibros');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const contactLink = document.getElementById('contactLink');
    const contactModal = document.getElementById('contactModal');
    const closeModal = document.querySelector('.close');

    // Mostrar los libros en la página
    function mostrarLibros(libros) {
        listaLibros.innerHTML = ''; // Limpiar la lista antes de mostrar

        libros.forEach((libro, index) => {
            const libroDiv = document.createElement('div');
            libroDiv.className = 'libro';
            libroDiv.innerHTML = `
                <strong>Título:</strong> ${libro.titulo}<br>
                <strong>Autor:</strong> ${libro.autor}<br>
                <strong>PDF:</strong> <a href="${libro.pdfUrl}" target="_blank" rel="noopener noreferrer">Ver PDF</a><br>
                <button onclick="eliminarLibro(${index})">Eliminar</button>
            `;
            listaLibros.appendChild(libroDiv);
        });
    }

    // Eliminar un libro
    window.eliminarLibro = function(index) {
        let libros = JSON.parse(localStorage.getItem('libros')) || [];
        libros.splice(index, 1);
        localStorage.setItem('libros', JSON.stringify(libros));
        mostrarLibros(libros);
    };

    // Manejar el envío del formulario
    bookForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const titulo = document.getElementById('titulo').value;
        const autor = document.getElementById('autor').value;
        const pdfFile = document.getElementById('pdfFile').files[0];

        if (titulo && autor && pdfFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const pdfUrl = e.target.result;
                const libro = { titulo, autor, pdfUrl };

                // Mostrar el libro en la lista
                mostrarLibros([libro]);

                // Limpiar el formulario
                bookForm.reset();
            };
            reader.readAsDataURL(pdfFile);
        } else {
            alert('Por favor, completa todos los campos y sube un archivo PDF.');
        }
    });

    // Función de búsqueda
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const libros = JSON.parse(localStorage.getItem('libros')) || [];

        const resultados = libros.filter(libro => 
            libro.titulo.toLowerCase().includes(searchTerm) ||
            libro.autor.toLowerCase().includes(searchTerm)
        );

        mostrarLibros(resultados);
    });

    // Función para mostrar la ventana modal de contacto
    contactLink.addEventListener('click', (event) => {
        event.preventDefault();
        contactModal.style.display = 'block';
    });

    // Función para cerrar la ventana modal de contacto
    closeModal.addEventListener('click', () => {
        contactModal.style.display = 'none';
    });

    // Cerrar la ventana modal si el usuario hace clic fuera de ella
    window.addEventListener('click', (event) => {
        if (event.target == contactModal) {
            contactModal.style.display = 'none';
        }
    });

    let slideIndex = 0;
    showSlides();

    function showSlides() {
        let slides = document.getElementsByClassName("mySlides");
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1}    
        slides[slideIndex-1].style.display = "block";  
        setTimeout(showSlides, 2000); // Change image every 2 seconds
    }

    window.plusSlides = function(n) {
        slideIndex += n;
        if (slideIndex > slides.length) {slideIndex = 1}
        if (slideIndex < 1) {slideIndex = slides.length}
        showSlides();
    }

    // Mostrar los libros al cargar la página
    mostrarLibros(JSON.parse(localStorage.getItem('libros')) || []);
});