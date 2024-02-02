import { Dispatch, SetStateAction } from "react";

export async function GetAsset({
  stateReq,
  setLoading,
}: {
  stateReq: {
    search?: string | undefined;
    limit?: number;
    offset?: number;
  };
  setLoading: Dispatch<SetStateAction<boolean>>;
}) {
  setLoading(true);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/assets?search=${stateReq.search}&limit=${stateReq.limit}&offset=${stateReq.offset}`,
      {
        next: { revalidate: 60 },
      }
    );
    return await res.json();
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
}

export async function GetAssetById({
  id,
  setLoading,
}: {
  id: string;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) {
  setLoading(true);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/assets/${id}`, {
      next: { revalidate: 60 },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
}

export async function GetMarketById({
  id,
  limit,
  offset,
  setLoading,
}: {
  id: string;
  limit?: number;
  offset?: number;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) {
  setLoading(true);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/assets/${id}/markets?limit=${limit}&offset=${offset}`,
      {
        next: { revalidate: 60 },
      }
    );
    return await res.json();
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
}

export async function GetHiistoryById({
  id,
  interval,
  start,
  end,
  setLoading,
}: {
  id: string;
  interval: string;
  start?: number;
  end?: number;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) {
  setLoading(true);
  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/assets/${id}/history`;
  const queryParams = new URLSearchParams({
    interval,
    ...(start !== undefined && { start: start?.toString() }),
    ...(end !== undefined && { end: end?.toString() }),
  });
  const url = `${baseUrl}?${queryParams}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
}

export async function GetRates({
  setLoading,
}: {
  setLoading: Dispatch<SetStateAction<boolean>>;
}) {
  setLoading(true);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rates`, {
      next: { revalidate: 60 },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
}
