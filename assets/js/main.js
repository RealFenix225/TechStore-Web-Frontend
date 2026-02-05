/*===================================================
BASE DE DATOS SIMULADA (Array de objetos) 04/02)
=====================================================
 */
const productsDB= [
  {
    id:"#1001",
    name: "Laptop HP Pavilon 15",
    desc: "Intel Core i9‑14900KS, 32GB RAM",
    category: "Portátiles",
    price: 2950.00,
    stock: 32
  },
  {
    id: "#1002",
    name: "Mouse Logitech MX Master",
    desc: "Ergonómico, Inalámbrico",
    category: "Periféricos",
    price: 99.90,
    stock: 45
  },
  {
    id: "#1003",
    name: "Monitor Samsung 24",
    desc: "FHD. 75Hz, IPS",
    category: "Monitor",
    price: 129.50,
    stock: 2
  },
  {
    id: "#1004",
    name: "Silla Gamer Pro",
    desc: "Ergonómico con soporte lumbar",
    category: "Mobiliario",
    price: 199.00,
    stock: 8
  }
];

/*================================================================
LÓGICA DEL INVENTARIO (Esto solo se ejecuta en inventario
==================================================================
 */

const tableBody = document.getElementById('inventoryTableBody');
const searchInput = document.getElementById('searchInput');

//Verifica si estamos en la página del inventario. Esto evita errores en otras páginas.
if(tableBody){

  //1. Función para pintar la tabla
  function renderTable(data){
    tableBody.innerHTML =''; //Limpia la tabla actual
    data.forEach(product => {
      //Lógica de Estado (Badge) según stock
      let statusBadge ='<span class="bagde badge-success">En Stock</span>';
      if(product.stock === 0){
        statusBadge = '<span class="badge badge-danger">Agotado</span>';
      }else if (product.stock < 5){
        statusBadge = '<span class="badge badge-danger">Bajo Stock</span>';
      }

      //Fila HTML
      const row = `
                <tr>
                    <td>${product.id}</td>
                    <td>
                        <strong>${product.name}</strong><br>
                        <span class="text-muted">${product.desc}</span>
                    </td>
                    <td>${product.category}</td>
                    <td>€${product.price.toFixed(2)}</td>
                    <td>${product.stock}</td>
                    <td>${statusBadge}</td>
                    <td>
                        <button class="btn-icon" title="Editar">✏️</button>
                        <button class="btn-icon delete" title="Eliminar">🗑️</button>
                    </td>
                </tr>
            `;
      tableBody.innerHTML += row; // Añadir fila al cuerpo de la tabla
    });
  }

  //2. Cargar tabla inicial
  renderTable(productsDB);

  //3. Lógica del Buscador (Filtrando en tiempo real)
  searchInput.addEventListener('keyup', (e)=>{
    const term = e.target.value.toLowerCase();

    //Filtrar el array 'productsDB'
    const filteredProducts = productsDB.filter(product =>
    product.name.toLowerCase().includes(term) ||
    product.category.toLowerCase().includes(term) ||
    product.id.toLowerCase().includes(term));

    //Esto pinta nuevamente la tabla con los datos filtrados
    renderTable(filteredProducts);
  });
}

/*
==========================================================
LÓGICA DE GESTIÓN (Solo se ejecuta en gestion.html
==========================================================
 */
const productForm = document.getElementById('productForm');

if(productForm){
  productForm.addEventListener('submit', (e) => {
    e.preventDefault(); //Evita que la página se recargue

    //1. Capturar los valores de los inputs
    const formData = new FormData(productForm);
    const newProduct = {
      name: formData.get('nombre'),
      sku: formData.get('sku'),
      price:formData.get('precio'),
      stock: formData.get('stock')
      };

    //2. Esto simula la respuesta del servidor
    console.log("Enviando datos a TechStore Enterprise API...", newProduct);

// 3. Feedback visual al usuario
    alert(`✅ ¡Éxito!\nEl producto "${newProduct.name}" ha sido registrado en el sistema.`);

    // Redirigir al inventario para ver la "actualización"
    window.location.href = 'dashboard.html';
  })
}
