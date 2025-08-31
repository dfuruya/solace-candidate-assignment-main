import db from "../../../db";
import { Advocate, advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

export type AdvocatesData = {
  data: Partial<Advocate>[]
}

export async function GET() {
  // Uncomment this line to use a database
  // const data = await db.select().from(advocates);

  const data = advocateData;

  return Response.json({ data } satisfies AdvocatesData);
}
