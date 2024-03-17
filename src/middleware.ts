import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PRIVATE_URLS = ['/forms/new'];
const AUTH_URL = ['/login', '/signup'];
export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });
    const { data: { user }, } = await supabase.auth.getUser();
    const pathname = req.nextUrl.pathname;
    if (user && AUTH_URL.includes(pathname)) {
        return NextResponse.redirect(new URL("/forms/new", req.url));
    }
    if (!user && PRIVATE_URLS.includes(pathname)) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
    return res;
}

export const config = {
    matcher: ["/login", "/signup", "/forms/new"]
}