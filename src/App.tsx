import { useEffect, useState } from "react";

interface Producto {
  id?: number;
  id_producto?: number;
  nombre?: string;
  nom_producto?: string;
  precio: number;
  categoria?: string;
  stock?: number;
  imagen?: string;
  img_producto?: string;
}

export default function App() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);

  useEffect(() => {
    fetch("https://avoc.alwaysdata.net/productos") //http://localhost:3000/productos    https://avoc.alwaysdata.net/productos
      .then((res) => {
        if (!res.ok) throw new Error("Error en la petición");
        return res.json();
      })
      .then((data: Producto[]) => {
        setProductos(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error al cargar productos desde Alwaysdata:", err);
        setCargando(false);
      });
  }, []);
  console.log(productos)
  return (
    <div className="bg-white text-black min-h-screen font-sans scroll-smooth">
      <header className="border-b border-gray-200 sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-amber-600 rounded-full"></div>
            <span className="text-2xl font-bold tracking-tight">Pastelería de Álvaro</span>
          </div>
          
          <nav className="hidden md:flex space-x-8 font-medium text-gray-700">
            <a href="#inicio" className="hover:text-black transition">Inicio</a>
            <a href="#catalogo" className="hover:text-black transition">Catálogo</a>
            <a href="#contacto" className="hover:text-black transition">Contacto</a>
          </nav>
        </div>
      </header>

      <section id="inicio" className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none mb-12">
          PASTELERÍA
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-2xl font-light">
          Elaboramos postres y tortas artesanales con ingredientes selectos, combinando técnicas tradicionales con una presentación impecable.
        </p>
      </section>

      <section className="border-t border-b border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <span className="text-5xl md:text-6xl font-bold">12<span className="text-amber-600">+</span></span>
            <p className="text-gray-500 mt-2 font-medium">Recetas Exclusivas</p>
          </div>
          <div>
            <span className="text-5xl md:text-6xl font-bold">500<span className="text-amber-600">+</span></span>
            <p className="text-gray-500 mt-2 font-medium">Clientes Satisfechos</p>
          </div>
          <div>
            <span className="text-5xl md:text-6xl font-bold">100<span className="text-amber-600">%</span></span>
            <p className="text-gray-500 mt-2 font-medium">Artesanal e Insumos Selectos</p>
          </div>
          <div>
            <span className="text-5xl md:text-6xl font-bold">5<span className="text-amber-600">★</span></span>
            <p className="text-gray-500 mt-2 font-medium">Calificación</p>
          </div>
        </div>
      </section>

      <section id="catalogo" className="bg-black text-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-sm font-semibold tracking-widest text-amber-500 uppercase mb-12">
            Nuestros Productos
          </h2>

          {cargando ? (
            <p className="text-gray-400">Cargando catálogo...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 content-start gap-6">
              {productos.map((item, index) => {
                const urlImagen = item.imagen || `https://i.pinimg.com/736x/da/96/74/da9674b9b9bf7825e6bedf687c1d6435.jpg`;

                return (
                  <div 
                    key={index} 
                    className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden flex flex-col justify-between hover:border-amber-500 transition group"
                  >
                    <div className="relative h-48 w-full overflow-hidden bg-neutral-800">
                      <img 
                        src={urlImagen} 
                        alt={item.nombre || item.nom_producto || "Producto AVOC"} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-amber-500 text-sm font-mono font-bold">
                            0{index + 1}
                          </span>
                          <span className="text-xs bg-neutral-800 text-amber-400 px-2 py-1 rounded">
                            {item.categoria || "Artesanal"}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2 hover:text-amber-500 transition cursor-pointer">
                          {item.nombre || item.nom_producto || "Producto AVOC"}
                        </h3>
                        <p className="text-gray-400 text-sm mb-4">
                          Stock disponible: {item.stock ?? 0}
                        </p>
                      </div>
                      <div className="flex justify-between items-center border-t border-neutral-800 pt-4 mt-2">
                        <span className="text-xl font-bold text-amber-400">
                          S/ {item.precio}
                        </span>
                        <button className="text-sm bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded transition">
                          Ver más
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <footer id="contacto" className="bg-neutral-950 text-gray-400 py-16 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Pastelería de Álvaro</h3>
            <p className="text-sm text-gray-400">
              Postres artesanales elaborados con insumos de alta calidad.
            </p>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contacto</h3>
            <p className="text-sm">Atención: Lunes a Sábado 9:00 - 10:00</p>
            <p className="text-sm">telefono/whatsapp: 962096025</p>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Ubicación</h3>
            <p className="text-sm">Jesus Maria, huiracocha 2287,Lima, Perú</p>
          </div>
        </div>
      </footer>
    </div>
  );
}