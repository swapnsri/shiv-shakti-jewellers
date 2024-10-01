"use client";
import Image from "next/image";
import { ProductTypes, products } from "@/app/lib/db";
import Modal from "../../../components/modal";
import { useParams } from "next/navigation";
import { useProducts } from "@/context/productContext";

export default function ProductDetailsModal() {
  const { id } = useParams();
  const { products } = useProducts();
  const product: ProductTypes = products.find((p) => p._id === id)!;

  return (
    <Modal>
      <div className="container my-10 rounded-xl">
        <div>
          <div>
            <h1 className="bg-[white] text-center text-3xl font-bold rounded-xl rounded-b-none text-[var(--brand-color1-900)]">
              {product.name}
            </h1>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <Image
                alt={product.name}
                src={product.imageUrl}
                className="object-contain rounded-xl !rounded-t-none !rounded-br-none"
                width={600}
                height={400}
              />
            </div>
            <div className="p-4 rounded-br-xl text-center bg-[var(--brand-color2-200)] py-4 flex flex-col gap-10 justify-center">
              <h3 className="rounded-xl border border-black">
                <strong className="px-2">Gross Weight</strong>
                <p className="bg-[white] rounded-xl px-2">{product.gwt}</p>
              </h3>
              <h3 className="rounded-xl border border-black">
                <strong className="px-2">Net Weight</strong>
                <p className="bg-[white] rounded-xl px-2">{product.nwt}</p>
              </h3>
              {product.silver && (
                <h3 className="rounded-xl border border-black">
                  <strong className="px-2">Silver Content</strong>
                  <p className="bg-[white] rounded-xl px-2">{product.silver}</p>
                </h3>
              )}
              <h3 className="rounded-xl border border-black">
                <strong className="px-2">Amount:</strong>{" "}
                <p className="bg-[white] rounded-xl px-2">{product.amount}</p>
              </h3>
              {product.less && (
                <h3 className="rounded-xl border border-black">
                  <strong className="px-2">Less:</strong>{" "}
                  <p className="bg-[white] rounded-xl px-2">{product.less}</p>
                </h3>
              )}
              {product.description && (
                <h3 className="rounded-xl border border-black">
                  <strong className="px-2">Description:</strong>{" "}
                  <div className="bg-[white] rounded-xl px-2">
                    {product.description.split(",").map((desc, index) => (
                      <p key={desc + index}>{desc}</p>
                    ))}
                  </div>
                </h3>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
