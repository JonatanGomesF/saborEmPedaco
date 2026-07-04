import { useEffect, useMemo, useState } from "react";
import { Plus, Trash2, ArrowUpDown, Pencil, X } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import type { MenuCategory, MenuProduct } from "../lib/menuStorage";
import {
  getStoredCategories,
  getStoredProducts,
  setStoredCategories,
  setStoredProducts,
} from "../lib/menuStorage";

const initialNewProduct: Omit<MenuProduct, "id"> = {
  name: "",
  description: "",
  price: 0,
  size: "",
  image: "",
  category: "Caldos",
};

function generateId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

export default function AdminCardapio() {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [products, setProducts] = useState<MenuProduct[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<string>("");
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<MenuProduct | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newProduct, setNewProduct] = useState<Omit<MenuProduct, "id">>(initialNewProduct);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const storedCategories = getStoredCategories();
    const storedProducts = getStoredProducts();
    setCategories(storedCategories);
    setProducts(storedProducts);
    setActiveCategoryId(storedCategories[0]?.id ?? "");
  }, []);

  const activeCategory = useMemo(
    () => categories.find((category) => category.id === activeCategoryId),
    [categories, activeCategoryId]
  );

  const productsInActiveCategory = useMemo(
    () => products.filter((product) => product.category === activeCategory?.name),
    [products, activeCategory]
  );

  const saveCategories = (next: MenuCategory[]) => {
    setCategories(next);
    setStoredCategories(next);
    if (!next.find((category) => category.id === activeCategoryId)) {
      setActiveCategoryId(next[0]?.id ?? "");
    }
  };

  const saveProducts = (next: MenuProduct[]) => {
    setProducts(next);
    setStoredProducts(next);
  };

  const handleCreateCategory = () => {
    if (!newCategoryName.trim()) {
      setFormError("Informe um nome para a categoria.");
      return;
    }
    const next: MenuCategory[] = [
      ...categories,
      { id: generateId().toString(), name: newCategoryName.trim() },
    ];
    saveCategories(next);
    setNewCategoryName("");
    setFormError("");
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (!confirm("Excluir a categoria também removerá os produtos dela. Continuar?")) return;
    const nextCategories = categories.filter((category) => category.id !== categoryId);
    const nextProducts = products.filter(
      (product) => product.category !== categories.find((category) => category.id === categoryId)?.name
    );
    saveCategories(nextCategories);
    saveProducts(nextProducts);
  };

  const handleOpenProductForm = (product?: MenuProduct) => {
    if (product) {
      setEditingProduct(product);
      setNewProduct({
        name: product.name,
        description: product.description,
        price: product.price,
        size: product.size,
        image: product.image,
        category: product.category,
      });
    } else {
      setEditingProduct(null);
      setNewProduct(initialNewProduct);
    }
    setFormError("");
    setShowProductForm(true);
  };

  const validateProduct = () => {
    if (!newProduct.name.trim()) return "Informe o nome do produto.";
    if (!newProduct.description.trim()) return "Informe a descrição do produto.";
    if (!newProduct.size.trim()) return "Informe o tamanho do produto.";
    if (!newProduct.image.trim()) return "Informe a imagem do produto.";
    if (!newProduct.price || Number(newProduct.price) <= 0) return "Informe um preço válido.";
    return null;
  };

  const handleSaveProduct = () => {
    const error = validateProduct();
    if (error) {
      setFormError(error);
      return;
    }

    const next: MenuProduct[] = editingProduct
      ? products.map((product) =>
          product.id === editingProduct.id
            ? { ...product, ...newProduct }
            : product
        )
      : [
          { id: generateId(), ...newProduct },
          ...products,
        ];

    saveProducts(next);
    setShowProductForm(false);
    setEditingProduct(null);
    setNewProduct(initialNewProduct);
    setFormError("");
  };

  const handleDeleteProduct = (id: number) => {
    if (!confirm("Excluir este produto?")) return;
    saveProducts(products.filter((product) => product.id !== id));
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="rounded-3xl p-6 border border-white/[0.06] bg-[#141414] shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-white font-black text-xl tracking-tight">Cardápio</h1>
              <p className="text-white/40 text-xs font-medium mt-2 max-w-2xl">
                Crie categorias, adicione produtos com imagem, descrição, preço e tamanho, e organize a ordem exibida no aplicativo.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleOpenProductForm()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#c0261a] text-white text-xs font-black transition hover:bg-[#a31d12]"
              >
                <Plus size={14} /> Criar produto
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
          <section className="space-y-4">
            <div className="rounded-3xl p-5 border border-white/[0.06] bg-white/5">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div>
                  <h2 className="text-white font-black text-sm">Categorias</h2>
                  <p className="text-white/40 text-[11px] mt-1">Crie e gerencie as categorias do cardápio.</p>
                </div>
                <button
                  onClick={handleCreateCategory}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#facc15] text-black text-[11px] font-black px-3 py-2"
                >
                  <Plus size={14} /> Nova categoria
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="Nome da categoria"
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-white text-sm outline-none"
                  />
                </div>

                <div className="space-y-2">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className={`flex items-center justify-between gap-2 rounded-2xl px-3 py-2 transition ${
                        category.id === activeCategoryId
                          ? "bg-[#facc15] text-black"
                          : "bg-white/5 text-white/80 hover:bg-white/10"
                      }`}
                    >
                      <button
                        onClick={() => setActiveCategoryId(category.id)}
                        className="text-left flex-1"
                      >
                        {category.name}
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="rounded-xl border border-white/[0.08] px-2 py-1 text-[11px] text-white/60 hover:text-white"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="rounded-3xl p-5 border border-white/[0.06] bg-white/5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-white font-black text-sm">Produtos em {activeCategory?.name ?? "nenhuma categoria"}</h2>
                  <p className="text-white/40 text-[11px] mt-1">Arraste para reordenar. A ordem salva reflete no frontend.</p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1 text-[11px] text-white/70">
                  <ArrowUpDown size={14} /> Ordenação manual
                </span>
              </div>

              {productsInActiveCategory.length === 0 ? (
                <div className="text-white/30 text-sm py-16 text-center">Nenhum produto nesta categoria.</div>
              ) : (
                <div className="space-y-3">
                  {productsInActiveCategory.map((product, index) => (
                    <div
                      key={product.id}
                      draggable
                      onDragStart={(e) => e.dataTransfer.setData("text/plain", String(index))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const sourceIndex = Number(e.dataTransfer.getData("text/plain"));
                        const targetIndex = index;
                        if (sourceIndex === targetIndex) return;
                        const categoryProducts = products.filter((p) => p.category === activeCategory?.name);
                        const moved = categoryProducts[sourceIndex];
                        const nextCategoryProducts = [...categoryProducts];
                        nextCategoryProducts.splice(sourceIndex, 1);
                        nextCategoryProducts.splice(targetIndex, 0, moved);

                        const nonCategoryProducts = products.filter((p) => p.category !== activeCategory?.name);
                        const firstCategoryIndex = products.findIndex((p) => p.category === activeCategory?.name);
                        const merged = [...nonCategoryProducts];
                        if (firstCategoryIndex >= 0) {
                          merged.splice(firstCategoryIndex, 0, ...nextCategoryProducts);
                        } else {
                          merged.push(...nextCategoryProducts);
                        }
                        saveProducts(merged);
                      }}
                      className="rounded-3xl bg-white/5 border border-white/[0.08] p-4 flex items-start gap-4 cursor-grab"
                    >
                      <div className="w-14 h-14 rounded-3xl bg-white/5 border border-white/[0.08] flex items-center justify-center text-white/50">
                        <ArrowUpDown size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <h3 className="text-white font-black text-sm truncate">{product.name}</h3>
                            <p className="text-white/40 text-[11px] truncate">{product.description}</p>
                          </div>
                          <span className="text-white/70 text-[11px] font-black">R$ {product.price.toFixed(2)}</span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-white/60">
                          <span className="rounded-full bg-white/5 px-2 py-1">{product.size}</span>
                          <span className="rounded-full bg-white/5 px-2 py-1">{product.category}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleOpenProductForm(product)}
                          className="rounded-xl bg-white/5 border border-white/[0.08] px-3 py-2 text-[11px] text-white/80 hover:bg-white/10"
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="rounded-xl bg-white/5 border border-white/[0.08] px-3 py-2 text-[11px] text-white/80 hover:bg-white/10"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>

        {showProductForm && (
          <div className="rounded-3xl p-6 border border-white/[0.06] bg-white/5">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h2 className="text-white font-black text-sm">
                {editingProduct ? "Editar produto" : "Criar novo produto"}
              </h2>
              <button
                onClick={() => setShowProductForm(false)}
                className="text-white/40 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-[11px] text-white/40">
                Nome do produto
                <input
                  value={newProduct.name}
                  onChange={(e) => setNewProduct((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-white text-sm outline-none"
                />
              </label>
              <label className="space-y-2 text-[11px] text-white/40">
                Tamanho
                <input
                  value={newProduct.size}
                  onChange={(e) => setNewProduct((prev) => ({ ...prev, size: e.target.value }))}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-white text-sm outline-none"
                />
              </label>
              <label className="space-y-2 text-[11px] text-white/40 md:col-span-2">
                Descrição
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full min-h-[120px] bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-white text-sm outline-none"
                />
              </label>
              <label className="space-y-2 text-[11px] text-white/40">
                Preço
                <input
                  type="number"
                  step="0.01"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct((prev) => ({ ...prev, price: Number(e.target.value) }))}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-white text-sm outline-none"
                />
              </label>
              <label className="space-y-2 text-[11px] text-white/40">
                Imagem (URL)
                <input
                  value={newProduct.image}
                  onChange={(e) => setNewProduct((prev) => ({ ...prev, image: e.target.value }))}
                  placeholder="Cole o link da imagem"
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-white text-sm outline-none"
                />
              </label>
              <label className="space-y-2 text-[11px] text-white/40 md:col-span-2">
                Categoria
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct((prev) => ({ ...prev, category: e.target.value }))}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-white text-sm outline-none"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            {formError && (
              <div className="text-red-400 text-[11px] font-semibold bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 mt-4">
                {formError}
              </div>
            )}
            <button
              onClick={handleSaveProduct}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#c0261a] px-5 py-3 text-sm font-black text-white hover:bg-[#a31d12] transition"
            >
              {editingProduct ? "Salvar alterações" : "Adicionar produto"}
            </button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
