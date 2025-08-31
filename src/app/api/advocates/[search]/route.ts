import { ilike, or, sql } from "drizzle-orm";

import db from "@/db";
import { advocates } from "@/db/schema";
import { AdvocatesData } from "../route";

export async function GET(_: Request) {
  const search = _.url.split('/').pop();
  const q = `%${search}%`;
  const data = await db
    .select()
    .from(advocates)
    .where(
      or(
        ilike(advocates.firstName, q),
        ilike(advocates.lastName, q),
        ilike(advocates.city, q),
        ilike(advocates.degree, q),
        sql`${advocates.specialties}::text ILIKE ${q}`
      )
      // sql`${advocates.firstName} ILIKE ${q} 
      //   OR ${advocates.lastName} ILIKE ${q} 
      //   OR ${advocates.city} ILIKE ${q} 
      //   OR ${advocates.degree} ILIKE ${q} 
      //   OR CAST(${advocates.yearsOfExperience} AS TEXT) ILIKE ${q} 
      //   OR EXISTS (
      //     SELECT 1 FROM jsonb_array_elements_text(${advocates.specialties}) AS specialty 
      //     WHERE specialty ILIKE ${q}
      //   )`
    )
    .limit(10);

  return Response.json({ data } satisfies AdvocatesData);
}
