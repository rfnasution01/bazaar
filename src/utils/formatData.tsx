export function splittedArray({
  text,
  split,
}: {
  text: string;
  split: string;
}) {
  return text.split(split);
}

export const capitalizeFirstLetterFromLowercase = (
  string = "",
  separator = " "
) => {
  if (!string) {
    return "-";
  }

  return string
    .split(separator) // " " for "EXAMPLE WORD", "_" for "EXAMPLE_WORD", and so on...
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ");
};

// input: "EXAMPLE WORD" => output: "Example Word"
export const capitalizeFirstLetterFromUppercase = (
  string = "",
  separator = " "
) => {
  if (!string) {
    return "-";
  }

  return string
    .split(separator)
    .map((word) => {
      const upperCaseWord = word.toUpperCase();

      switch (upperCaseWord) {
        case "RSUD":
        case "PT":
          return upperCaseWord;
        default:
          return `${word.charAt(0)}${word.slice(1).toLowerCase()}`;
      }
    })
    .join(" ");
};

export function convertToTitleCase(inputString = "") {
  // Memastikan input tidak kosong
  if (inputString.length === 0) {
    return inputString;
  }

  // Membagi string menggunakan "-" sebagai pemisah
  const splittedArray = inputString.split("-");

  // Mengkapitalisasi huruf pertama dari setiap kata dalam array
  const capitalizedArray = splittedArray.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  // Menggabungkan array kata-kata menjadi string dengan spasi sebagai pemisah
  const resultString = capitalizedArray.join(" ");

  return resultString;
}

export function numberFormatInteger(number = "") {
  return Math.round(parseFloat(number));
}

export function roundToNDecimals(number = 0, n = 0) {
  const multiplier = Math.pow(10, n);
  return Math.round(number * multiplier) / multiplier;
}

export function convertCurrency(priceOrigin = 0, priceCurrency = 0) {
  return priceOrigin * (1 / priceCurrency);
}

export function formatNumberWithCommas(number = 0) {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function numberDecimalSetting(priceOrigin = 0, priceCurrency = 0) {
  const prices = convertCurrency(priceOrigin, priceCurrency);
  if (prices > 1000) {
    return roundToNDecimals(prices, 0);
  } else if (prices > 100) {
    return roundToNDecimals(prices, 2);
  } else if (prices > 10) {
    return roundToNDecimals(prices, 4);
  } else if (prices > 1) {
    return roundToNDecimals(prices, 6);
  } else {
    return roundToNDecimals(prices, 8);
  }
}

export function convertNumberToString(number = 0) {
  if (number >= 1000000000) {
    return (number / 1000000000).toFixed(1) + " B";
  } else if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + " M";
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + " K";
  } else {
    return number?.toString();
  }
}

export function convertToSlug(text = "") {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-") // Ganti spasi dengan tanda strip
    .replace(/[^\w\-]+/g, "") // Hapus karakter non-word dan non-stripped
    .replace(/\-\-+/g, "-") // Ganti dua strip atau lebih dengan satu strip
    .replace(/^-+/, "") // Hapus strip dari awal teks
    .replace(/-+$/, ""); // Hapus strip dari akhir teks
}

export function convertSlugToText(slug = "") {
  // Ubah strip menjadi spasi dan ubah teks menjadi huruf kapital setiap kata
  const text = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return text;
}
