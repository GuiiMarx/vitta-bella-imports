"use client";

import Image from "next/image";
import { useState } from "react";
import { products, collections } from "@/data/products";
import { useCart } from "@/components/CartProvider";
import { ShoppingBag, X, Minus, Plus, Check } from "lucide-react";

function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function HomePage() {
  const { cart, addToCart, changeQty, removeItem, clearCart, total, count } =
    useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const handleAdd = (product: (typeof products)[0]) => {
    addToCart(product);
    showToast(`${product.name} adicionado!`);
  };

  const handleCheckout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const id = "VB" + Date.now().toString().slice(-8);
    setOrderId(id);
    setOrderSuccess(true);
    clearCart();
  };

  return (
    <div className="min-h-screen bg-navy">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b-2 border-gold bg-gradient-to-b from-navy-dark to-navy shadow-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Vitta Bella Imports"
              width={160}
              height={70}
              className="h-14 w-auto drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
              priority
            />
          </div>
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-gold-dark px-5 py-2.5 font-semibold text-navy shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <ShoppingBag size={18} />
            Carrinho
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-navy text-xs font-bold text-gold">
                {count}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-[radial-gradient(ellipse_at_top,#1a2f4a_0%,#0a1628_70%)] px-5 pb-6 pt-10 text-center">
        <h1 className="font-playfair text-3xl font-bold uppercase tracking-[3px] text-gold drop-shadow-md md:text-4xl">
          Perfumes Árabes Importados
        </h1>
        <p className="mt-2 text-sm font-light uppercase tracking-[4px] text-slate-400">
          Sofisticação • Elegância • Perfumaria Árabe
        </p>
        <div className="mx-auto mt-5 h-0.5 w-28 bg-gradient-to-r from-transparent via-gold to-transparent" />
      </section>

      {/* Collections */}
      {collections.map((col) => (
        <section key={col.id} className="mx-auto max-w-6xl px-5 py-10">
          <h2 className="mb-8 text-center font-playfair text-2xl font-semibold uppercase tracking-[4px] text-gold">
            <span className="hidden sm:inline">——— </span>
            {col.name}
            <span className="hidden sm:inline"> ———</span>
          </h2>

          <div
            className={`grid gap-6 justify-items-center ${
              col.id === "asad"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                : col.id === "yara"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
                : "grid-cols-1 sm:grid-cols-2 max-w-xl mx-auto"
            }`}
          >
            {products
              .filter((p) => p.collection === col.id)
              .map((product) => (
                <div
                  key={product.id}
                  className="flex w-full max-w-[240px] flex-col overflow-hidden rounded-xl border border-gold/20 bg-gradient-to-br from-[#fdf8f0] to-[#f0e6d2] shadow-xl transition hover:-translate-y-2 hover:border-gold hover:shadow-2xl"
                >
                  <div className="flex h-52 items-center justify-center bg-white p-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={180}
                      height={180}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between bg-gradient-to-b from-cream to-[#efe4ce] p-4 text-center">
                    <div>
                      <h3 className="font-playfair text-lg font-semibold text-gray-900">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-xl font-bold text-[#8b6914]">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleAdd(product)}
                      className="mt-3 w-full rounded-lg border border-gold bg-gradient-to-r from-navy to-navy-light py-2.5 text-sm font-semibold tracking-wide text-gold transition hover:from-gold hover:to-gold-dark hover:text-navy"
                    >
                      Adicionar ao Carrinho
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </section>
      ))}

      {/* Footer */}
      <footer className="mt-8 border-t border-gold/30 bg-navy-dark py-10 text-center">
        <p className="font-playfair text-xl tracking-widest text-gold">
          VITTA BELLA IMPORTS
        </p>
        <p className="mt-2 text-xs uppercase tracking-[3px] text-slate-500">
          Sofisticação • Elegância • Perfumaria Árabe
        </p>
        <p className="mt-4 text-xs text-slate-600">
          © 2026 Vitta Bella Imports. Todos os direitos reservados.
        </p>
      </footer>

      {/* Cart Sidebar */}
      {cartOpen && (
        <>
          <div
            className="fixed inset-0 z-[100] bg-black/60"
            onClick={() => setCartOpen(false)}
          />
          <aside className="fixed right-0 top-0 z-[101] flex h-full w-full max-w-md flex-col border-l-2 border-gold bg-navy-light shadow-2xl">
            <div className="flex items-center justify-between border-b border-gold/30 p-5">
              <h2 className="font-playfair text-xl text-gold">Seu Carrinho</h2>
              <button
                onClick={() => setCartOpen(false)}
                className="text-2xl text-cream hover:text-gold"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {count === 0 ? (
                <p className="py-16 text-center text-slate-500">
                  Seu carrinho está vazio
                </p>
              ) : (
                Object.values(cart).map((item) => (
                  <div
                    key={item.id}
                    className="mb-3 flex gap-3 rounded-lg border border-gold/15 bg-white/5 p-3"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="h-16 w-16 rounded-md bg-white object-contain p-1"
                    />
                    <div className="flex-1">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm font-semibold text-gold">
                        {formatPrice(item.price)}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={() => changeQty(item.id, -1)}
                          className="flex h-7 w-7 items-center justify-center rounded border border-gold bg-gold/20 text-gold"
                        >
                          <Minus size={14} />
                        </button>
                        <span>{item.qty}</span>
                        <button
                          onClick={() => changeQty(item.id, 1)}
                          className="flex h-7 w-7 items-center justify-center rounded border border-gold bg-gold/20 text-gold"
                        >
                          <Plus size={14} />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-auto text-xs text-red-400 underline"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-gold/30 bg-[#0d1a2d] p-5">
              <div className="mb-4 flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span className="text-gold">{formatPrice(total)}</span>
              </div>
              <button
                disabled={count === 0}
                onClick={() => {
                  setCartOpen(false);
                  setCheckoutOpen(true);
                  setOrderSuccess(false);
                }}
                className="w-full rounded-xl bg-gradient-to-r from-gold to-gold-dark py-3.5 font-bold tracking-wide text-navy disabled:opacity-50"
              >
                Finalizar Compra
              </button>
            </div>
          </aside>
        </>
      )}

      {/* Checkout Modal */}
      {checkoutOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/75 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border-2 border-gold bg-navy-light shadow-2xl">
            <div className="flex items-center justify-between border-b border-gold/30 p-5">
              <h2 className="font-playfair text-xl text-gold">
                Finalizar Compra
              </h2>
              <button
                onClick={() => setCheckoutOpen(false)}
                className="text-2xl text-cream hover:text-gold"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              {orderSuccess ? (
                <div className="py-8 text-center">
                  <div className="mb-4 text-5xl text-green-400">
                    <Check size={64} className="mx-auto" />
                  </div>
                  <h3 className="font-playfair text-2xl text-gold">
                    Pedido Confirmado!
                  </h3>
                  <p className="mt-3 text-slate-400">
                    Seu pedido <strong className="text-gold">#{orderId}</strong>{" "}
                    foi recebido com sucesso.
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    Em breve você receberá um e-mail com os detalhes.
                    <br />
                    (Gateway de pagamento será integrado em breve)
                  </p>
                  <button
                    onClick={() => setCheckoutOpen(false)}
                    className="mt-6 rounded-lg bg-gradient-to-r from-gold to-gold-dark px-8 py-3 font-bold text-navy"
                  >
                    Continuar Comprando
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-5 rounded-lg border border-gold/20 bg-black/25 p-4">
                    <h3 className="mb-2 text-sm font-semibold text-gold">
                      Resumo do Pedido
                    </h3>
                    {Object.values(cart).map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between text-sm text-slate-300"
                      >
                        <span>
                          {item.qty}x {item.name}
                        </span>
                        <span>{formatPrice(item.price * item.qty)}</span>
                      </div>
                    ))}
                    <div className="mt-2 flex justify-between border-t border-gold/30 pt-2 font-bold text-gold">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>

                  <form onSubmit={handleCheckout} className="space-y-4">
                    <div>
                      <label className="mb-1 block text-sm text-slate-400">
                        Nome Completo *
                      </label>
                      <input
                        name="name"
                        required
                        className="w-full rounded-lg border border-gold/30 bg-black/30 px-4 py-2.5 text-cream outline-none focus:border-gold"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm text-slate-400">
                        E-mail *
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        className="w-full rounded-lg border border-gold/30 bg-black/30 px-4 py-2.5 text-cream outline-none focus:border-gold"
                        placeholder="seu@email.com"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm text-slate-400">
                        Telefone / WhatsApp *
                      </label>
                      <input
                        name="phone"
                        required
                        className="w-full rounded-lg border border-gold/30 bg-black/30 px-4 py-2.5 text-cream outline-none focus:border-gold"
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm text-slate-400">
                        CEP *
                      </label>
                      <input
                        name="cep"
                        required
                        className="w-full rounded-lg border border-gold/30 bg-black/30 px-4 py-2.5 text-cream outline-none focus:border-gold"
                        placeholder="00000-000"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm text-slate-400">
                        Endereço *
                      </label>
                      <input
                        name="address"
                        required
                        className="w-full rounded-lg border border-gold/30 bg-black/30 px-4 py-2.5 text-cream outline-none focus:border-gold"
                        placeholder="Rua, número, complemento"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="mb-1 block text-sm text-slate-400">
                          Cidade *
                        </label>
                        <input
                          name="city"
                          required
                          className="w-full rounded-lg border border-gold/30 bg-black/30 px-4 py-2.5 text-cream outline-none focus:border-gold"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm text-slate-400">
                          Estado *
                        </label>
                        <select
                          name="state"
                          required
                          className="w-full rounded-lg border border-gold/30 bg-black/30 px-4 py-2.5 text-cream outline-none focus:border-gold"
                        >
                          <option value="">Selecione</option>
                          {["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"].map((uf) => (
                            <option key={uf} value={uf}>{uf}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm text-slate-400">
                        Forma de Pagamento *
                      </label>
                      <select
                        name="payment"
                        required
                        className="w-full rounded-lg border border-gold/30 bg-black/30 px-4 py-2.5 text-cream outline-none focus:border-gold"
                      >
                        <option value="">Selecione</option>
                        <option value="pix">PIX (5% de desconto)</option>
                        <option value="credit">Cartão de Crédito</option>
                        <option value="debit">Cartão de Débito</option>
                        <option value="boleto">Boleto Bancário</option>
                      </select>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setCheckoutOpen(false)}
                        className="flex-1 rounded-lg border border-slate-600 py-3 text-slate-400"
                      >
                        Voltar
                      </button>
                      <button
                        type="submit"
                        className="flex-[2] rounded-lg bg-gradient-to-r from-gold to-gold-dark py-3 font-bold text-navy"
                      >
                        Confirmar Pedido
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-8 left-1/2 z-[300] -translate-x-1/2 rounded-full bg-gradient-to-r from-gold to-gold-dark px-6 py-3 font-semibold text-navy shadow-xl">
          {toast}
        </div>
      )}
    </div>
  );
}
