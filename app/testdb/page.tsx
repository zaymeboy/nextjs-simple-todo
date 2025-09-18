"use client";
import { supabase } from "@/lib/supabaseClient";

export default function testdb() {
  async function getData() {
    const { data, error } = await supabase.from("tasks").select("*");
    console.log(data, error);
  }

  return <button onClick={getData}>Load Todos</button>;
}
