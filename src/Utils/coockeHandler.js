import { serialize } from "cookie";

export const cookieHandler = (response, token, set) => {

    response.setHeader("Set-Cookie", serialize("token", set ? token : "", {
        path: "/",
        httpOnly: true,
        maxAge: set ? 2 * 24 * 60 * 60 : 0,
    })
    );
}