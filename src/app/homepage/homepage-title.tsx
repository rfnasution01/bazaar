import { ChevronDown } from "lucide-react";
import { HomepageCurrency } from ".";

export function HomepageTitle({
  stateCurrency,
}: {
  stateCurrency: Record<string, string | undefined>;
}) {
  return (
    <>
      <div className="flex justify-end block lg:hidden">
        <HomepageCurrency stateCurrency={stateCurrency} />
      </div>
      <div className="flex justify-between items-start gap-x-4">
        <div className="flex-1">
          <h5 className="lg:text-2xl text-lg font-semibold tracking-widest">
            Bazaar
          </h5>
          <h6 className="lg:text-lg text-xs font-light tracking-wide">
            Dengan Bazaar, eksplorasi dunia crypto menjadi lebih mudah. Pantau
            harga dan perubahan pasar terbaru dengan cepat dan akurat, semua
            dalam satu platform yang intuitif.
          </h6>
        </div>
        <div className="flex-1">
          <div className="flex justify-end">
            <HomepageCurrency stateCurrency={stateCurrency} />
          </div>
        </div>
      </div>
    </>
  );
}
