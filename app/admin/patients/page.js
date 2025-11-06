"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Patients() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/patients?page=${page}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch patients");
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, [page]);

  if (error) {
    return <div className="text-red-500 p-6 text-center">Error: {error}</div>;
  }

  if (!data) {
    return <div className="text-center p-6 text-muted-foreground">Loading patients...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-10 text-white">
      <h1 className="text-3xl font-bold mb-6">All Patients ({data.total})</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.patients.map((p) => (
          <Card key={p.id} className="bg-emerald-950/30 border border-emerald-800/40">
            <CardContent className="p-4">
              <p className="font-semibold text-lg">{p.name}</p>
              <p className="text-sm text-muted-foreground">
                Age: {p.age}, Gender: {p.gender}
              </p>
              <p className="text-xs mt-1 text-muted-foreground">
                Last Visit: {new Date(p.lastVisit).toLocaleDateString("en-IN")}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <Button
          variant="outline"
          className="border-emerald-700/50"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span className="text-muted-foreground">
          Page {data.page} of {data.totalPages}
        </span>
        <Button
          variant="outline"
          className="border-emerald-700/50"
          onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
          disabled={page === data.totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
