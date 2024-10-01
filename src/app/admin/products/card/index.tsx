import Image from "next/image";
import React from "react";
type Props = {
  imageURL: string;
  name: string;
  description: string | null;
  labour: string;
  Purity: string | null;
  silver: string | null;
  amount: string;
  nwt: string;
  gwt: string;
  less: string | null;
};
export default function ProductCard({
  imageURL,
  name,
  description,
  labour,
  Purity,
  silver,
  amount,
  nwt,
  gwt,
  less,
}: Props) {
  return (
    <div className="w-[320px] md:w-[300px]  h-full rounded-xl bg-[var(--brand-color1-100)] border">
      <div className="image-container rounded-xl relative h-[400px]">
        <Image
          className="rounded-xl rounded-b-[0] border-b"
          src={imageURL}
          alt=""
          layout="fill"
          objectFit="cover"
        />
        {gwt && (
          <div className="absolute top-1 right-1 p-[2px] rounded bg-white">
            <strong>Gwt:</strong> {gwt}
          </div>
        )}
        {nwt && (
          <div className="absolute top-1 left-1 p-[2px] rounded bg-white">
            <strong>Nwt:</strong> {nwt}
          </div>
        )}
        {less && (
          <div className="absolute bottom-1 left-1 p-[2px] rounded bg-white">
            <strong>Less:</strong> {less}
          </div>
        )}
      </div>
      <div className="p-2 rounded-xl rounded-t-[0]">
        <div className="text-center text-[var(--brand-color1-900)]">{name}</div>
        <div className="details-Extra-container">
          <div className="details  grid grid-cols-2 px-2 text-center ">
            {labour && (
              <div>
                <strong>Labour:</strong>{" "}
                <p className="bg-white border">{labour}</p>
              </div>
            )}
            {Purity && (
              <div>
                <strong>Purity:</strong>{" "}
                <p className="bg-white border">{Purity}</p>
              </div>
            )}

            {silver && (
              <div>
                <strong>Silver:</strong>{" "}
                <p className="bg-white border">{silver}</p>
              </div>
            )}

            {amount && (
              <div>
                <strong>Amount:</strong>{" "}
                <p className="bg-white border">{amount}</p>
              </div>
            )}
          </div>
          <div className="Extra">
            {description && (
              <p className="text-center">
                <strong>Extra:</strong>
              </p>
            )}
            <div
              className={`grid ${
                description && description.split(",").length > 1
                  ? "grid-cols-2"
                  : ""
              } text-center`}
            >
              {description &&
                description.split(",").map((Extra, index, array) => (
                  <div
                    key={index}
                    className={`text-center text-[var(--brand-color2-900)] ${
                      // Check if it's the last item in the array
                      index === array.length - 1 && array.length % 2 !== 0
                        ? "col-span-2"
                        : ""
                    }`}
                  >
                    <p className="bg-[var(--brand-color2-400)] border break-all">
                      {Extra}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
