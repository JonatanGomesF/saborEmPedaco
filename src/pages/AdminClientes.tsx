import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

type Customer = {
  id: number;
  name: string;
  phone: string;
  street: string;
  number: string;
  district: string;
last_order_value: number;
  created_at: string;
};
export default function AdminClientes() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setCustomers(data);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">
        Clientes Cadastrados
      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
<thead className="bg-orange-500 text-white">
  <tr>
    <th className="p-3 text-left">Nome</th>
    <th className="p-3 text-left">WhatsApp</th>
    <th className="p-3 text-left">Rua</th>
    <th className="p-3 text-left">Número</th>
    <th className="p-3 text-left">Bairro</th>
    <th className="p-3 text-left">Data</th>
    <th className="p-3 text-left">Último Pedido</th>
  </tr>
</thead>
<tbody>
  {customers.map((customer) => (
    <tr
      key={customer.id}
      className="border-b hover:bg-gray-50"
    >
      <td className="p-3">{customer.name}</td>

      <td className="p-3">
        <a
          href={`https://wa.me/55${customer.phone.replace(/\D/g, "")}`}
          target="_blank"
          rel="noreferrer"
          className="text-green-600 font-medium"
        >
          {customer.phone}
        </a>
      </td>

      <td className="p-3">{customer.street}</td>

      <td className="p-3">{customer.number}</td>

      <td className="p-3">{customer.district}</td>

      <td className="p-3">
        {new Date(customer.created_at).toLocaleDateString("pt-BR")}
      </td>
      <td className="p-3">
  R$ {Number(customer.last_order_value || 0).toFixed(2)}
</td>
    </tr>
  ))}
</tbody>
        </table>
      </div>
    </div>
  );
}