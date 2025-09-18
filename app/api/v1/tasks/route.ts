import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

//get all tasks
export async function GET() {
    const { data, error } = await supabase.from("tasks").select("*").order("created_at" ,{ascending:false});
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
}

//add one tasks
export async function POST(req: Request) {
    const body = await req.json();

    const { data, error } = await supabase
        .from("tasks")
        .insert([{ title: body.title }])
        .select();
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data[0], { status: 201 });
}

//update tasks value [completed & title]
export async function PUT(req: Request) {
    const body = await req.json(); 

    const updateObject:{title?:string , completed?:boolean}={}

    if (typeof body.completed ==='boolean'){
        updateObject.completed=body.completed;
    }
    if (typeof body.title ==='string'){
        updateObject.title=body.title;
    }

    const { data, error } = await supabase
        .from('tasks')
        .update(updateObject)
        .eq('id', body.id)
        .select();
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data[0], { status: 201 });
}

//delete tasks
export async function DELETE(req: Request) {
    const body = await req.json();

    const { data, error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', body.id)
        .select();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data[0], { status: 201 });
}