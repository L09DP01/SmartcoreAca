import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import { toCsv } from "@/lib/utils";

export async function GET(request: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ message: "Non autorisé." }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format");
  const search = searchParams.get("search");
  const city = searchParams.get("city");
  const status = searchParams.get("status");
  const paymentStatus = searchParams.get("paymentStatus");
  const registrationStatus = searchParams.get("registrationStatus");
  const date = searchParams.get("date");

  let query = getSupabaseAdmin()
    .from("registrations")
    .select("*")
    .order("created_at", { ascending: false });

  if (search) {
    query = query.or(
      `first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%,whatsapp.ilike.%${search}%,registration_number.ilike.%${search}%`,
    );
  }
  if (city) query = query.ilike("city", `%${city}%`);
  if (status) query = query.eq("status", status);
  if (paymentStatus) query = query.eq("payment_status", paymentStatus);
  if (registrationStatus) query = query.eq("registration_status", registrationStatus);
  if (date) {
    query = query.gte("created_at", `${date}T00:00:00`).lte("created_at", `${date}T23:59:59`);
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ message: error.message }, { status: 500 });

  if (format === "csv") {
    const dateLabel = new Date().toISOString().slice(0, 10);
    return new NextResponse(toCsv(data ?? []), {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="rapport-inscriptions-smartcore-${dateLabel}.csv"`,
      },
    });
  }

  return NextResponse.json({ registrations: data ?? [] });
}
