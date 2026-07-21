import { NextResponse } from "next/server";
import { createConfirmationPdf } from "@/lib/pdf";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: registrationNumber } = await params;
    const token = new URL(request.url).searchParams.get("token");
    if (!token) return NextResponse.json({ message: "Lien invalide." }, { status: 401 });

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("registrations")
      .select("*")
      .eq("registration_number", registrationNumber)
      .eq("confirmation_token", token)
      .single();

    if (error || !data) {
      return NextResponse.json({ message: "Inscription introuvable." }, { status: 404 });
    }

    const pdf = await createConfirmationPdf(data);
    return new NextResponse(Buffer.from(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${registrationNumber}.pdf"`,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Une erreur est survenue.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
