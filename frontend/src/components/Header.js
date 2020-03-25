import React, { useContext } from "react";
import {
    Navbar,
    DivNavbar,
    Wrapper,
    NavLinks,
    Alinks,
    Button,
    EndWrapper,
    EndNav
} from "./Header-styles";
import AuthGlobal from "../context/store/AuthGlobal";
import { logoutUser } from "../context/actions/autenticacion.action";

export default function Header() {
    const context = useContext(AuthGlobal);
    const endSesion = () => {
        logoutUser(context.dispatch);
    };

    return (
        <Navbar>
            <DivNavbar>
                <Wrapper>
                    <NavLinks>
                        {context.stateUser.isAuthenticated === true ? (
                            <>
                                <Alinks>
                                    {context.stateUser.user.userbd.name}
                                </Alinks>
                                <Alinks>
                                    {context.stateUser.user.userbd.email}
                                </Alinks>
                            </>
                        ) : null}
                    </NavLinks>
                </Wrapper>
                <EndWrapper>
                    <EndNav>
                        <Button onClick={endSesion}>Logout</Button>
                    </EndNav>
                </EndWrapper>
            </DivNavbar>
        </Navbar>
    );
}
