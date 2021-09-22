import React from 'react'
import {Link, useHistory, useParams} from 'react-router-dom'
import 'component/admin/Nav/nav.scss'
import {selectors as pendingUserAdminPickerSelectors} from "reducers/detailPicker";
import {actions as notificationActions} from "reducers/notification";
import {connect} from "react-redux";

export const Nav = ({ isDirty, showNotification }) => {
    const Historial = useHistory();
    let Location =useParams().id;

    const handleClick =  (e) => {
        e.preventDefault();
        let onClose = ()=>{
            Historial.push(e.target.pathname);
        };
        if(isDirty) {
            showNotification(
                {
                    level:"warning",
                    title: "Guardá tus cambios",
                    body:"Si te vas sin guardar, tus cambios no van a quedar registrados",
                    onClickLabel: "Ir a guardar",
                    onCloseLabel: "No quiero guardarlos",
                    onClose: onClose,
                    onClick: ()=>window.scroll({ top: window.innerHeight, left: 0,  behavior: 'smooth' })
                }
            );
        } else {
            onClose();
        }
    }

    return (
        <nav className="navAdmin ">
            <div className="tamScroll scroll">
                <ul>
                    <h3>Reportes</h3>
                    <li>
                        { window.location.pathname  ==="/dashboard"  ? <div className="circle"></div> : null     }  <Link onClick={handleClick}  to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        {   window.location.pathname  === "/pickers"
                        || window.location.pathname  ===`/pickers/${Location}`
                            ? <div className="circle"></div> :  null
                        } <Link onClick={handleClick} to="/pickers">Flota</Link>
                    </li>
                    <li>
                        { window.location.pathname.includes("/transaction") ?<div className="circle"></div> : null    }   <Link  onClick={handleClick} to="/transaction">Transacciones</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
};


const mapStateToProps = (state) => ({
    isDirty: pendingUserAdminPickerSelectors.isDirty(state),
});

const mapDispatchToProps = (dispatch) => ({
    showNotification: (content) => {
        dispatch(notificationActions.showNotification(content));
    },
});

export default connect(mapStateToProps,mapDispatchToProps)(Nav);
