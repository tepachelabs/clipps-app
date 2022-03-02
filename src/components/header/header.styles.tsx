import styled, { css } from "styled-components";
import { NavLink as LinkComponent } from "react-router-dom";

export const Container = styled.nav`
  background: #fff;
  border-bottom: 1px solid #eee;
  padding-left: 2em;
`;

export const Ul = styled.ul`
  background-color: transparent !important;
`;

const NavItem = css`
  color: #413e8b;
  transition: all 0.35s ease-in-out;

  &.active {
    font-weight: bold;
  }

  &:hover {
    color: rgba(#413e8b, 0.4);
  }
`;

export const Link = styled(LinkComponent)`
  ${NavItem}
`;

export const NavAnchor = styled.a`
  ${NavItem}
`;
