import React, { useCallback, useEffect, useState } from "react";
import ButtonNxtPrv from '../components/ButtonNxtPrv'
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import TableUserList from '../components/TableUserList'
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from '../store/features/usersSlice'

const UserList = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['userToken']);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const currentUsers = useSelector((state) => state.users.currentUser)
    console.log("this:", currentUsers)

    useEffect(() => {
        if (!cookies.userToken) {
            dispatch(clearUser())
            navigate("/")
        }
    }, [cookies.userToken])

    const onLogout = useCallback(
        () => {
            dispatch(clearUser())
            removeCookie("userToken")
        },
        [],
    )

    return (
        <Container>
            <Sidebar />
            <div className="flex flex-col w-full h-full m-5 ">
                <Navbar namePages={"User List"}
                    onLogout={onLogout}
                    userName={currentUsers.full_name}
                />
                <div>
                    <TableUserList />
                </div>
                <ButtonNxtPrv />
            </div>
        </Container>
    )
}

export default UserList