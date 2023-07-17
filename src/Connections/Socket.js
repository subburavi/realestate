import React, { useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { addonListUpdate, cafeListUpdate, menuListUpdate, socketSidupdate, socketStateupdate, updateCart, updateMessages, updateOrderData, updateOrders, updateOrderStatus, updateOTPRes, updatePackages, updatePaymentModelStatus, updateSickMealRes, updateSickMealTimes, updateSubscription, updateSubUsage, userUpdate } from '../Store/Appdataslice';
import Notify from 'notifyjs';
import { decrypt, encrypt } from '../components/Modifydata';


const SocketContext = React.createContext({
    isConnected: true,
    sendCommand: (command) => { },
    userdata: {},
    socket: null
})
// const socket = io('ws://172.17.58.83:3008', {
//     withCredentials: true,
//     transports: ["websocket"],
//     query: {
//         token: 'SUB54353BUR5435AMKRI0343' // Replace with your own token
//     }

// });
// const socket = io('wss://gcafeserver.gitam.edu:3001', {
//     withCredentials: true, transports: ["websocket"]

// });

const socket = io('wss://fnbserver.gitam.edu:3004', {
    withCredentials: true, transports: ["websocket"]

});


export const SocketContextProvider = (props) => {
    const orders = useSelector((state) => state.appdata.orders);

    const [userdata, setUseradata] = useState({});
    const [readyState, setReadyState] = useState(socket.connected);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    String.prototype.hashCode = function () {
        var hash = 0,
            i, chr;
        if (this.length === 0) return hash;
        for (i = 0; i < this.length; i++) {
            chr = this.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }
    if (localStorage.getItem('deviceid') == undefined) {
        const str = 'Device-' + (Math.floor(Math.random() * 1000000));
        localStorage.setItem('deviceid', str.hashCode());

    }
    //notifications code



    function showNotification(title, body, icon) {
        Notification.requestPermission((result) => {

            if (result === "granted") {
                navigator.serviceWorker.ready.then((registration) => {
                    registration.showNotification(title, {
                        body: body,
                        icon: "../images/touch/chrome-touch-icon-192x192.png",
                        vibrate: [200, 100, 200, 100, 200, 100, 200],

                    });
                });
            }
        });
    }
    // showNotification()
    // const onPermissionGranted = () => {
    //     console.log('Permission has been granted by the user');
    // }

    // const onPermissionDenied = () => {
    //     console.warn('Permission has been denied by the user');
    // }
    // if (!Notify.needsPermission) {
    //     var myNotification = new Notify('Eat spot', {
    //         body: 'You logged in as a guest',
    //         notifyShow: onNotifyShow
    //     });
    //     myNotification.show();
    // } else if (Notify.isSupported()) {
    //     Notify.requestPermission(onPermissionGranted, onPermissionDenied);
    // } else {
    //     alert('not supported')
    // }

    //end of notification code



    function onNotifyShow() {
        console.log('notification was shown!');
    }

    useEffect(() => {
        dispatch(socketStateupdate({ 'state': socket.connected }))
    }, [socket.connected]);
    useEffect(() => {

        socket.on('connect', () => {

            setReadyState(true);
        });

        socket.on('disconnect', () => {

            setReadyState(false);
        });
        socket.on('Cafe list', (data) => {

            var data = decrypt(data);
            dispatch(cafeListUpdate((data)));
        });

        socket.on('Messages', (data) => {
            var data = decrypt(data);
            dispatch(updateMessages((data.messages)));
        });
        socket.on('Sick Meal times', (data) => {
            var data = decrypt(data);

            dispatch(updateSickMealTimes(data));
        });


        socket.on('Notify', (data) => {
            var data = decrypt(data);
            showNotification(data.title, data.body, '')
        });
        socket.on('Menu list', (data) => {
            var data = decrypt(data);

            if (data.res != undefined) dispatch(menuListUpdate({ loader: false, data: data.res }));
            else dispatch(menuListUpdate({ loader: false, data: [] }));
        });
        socket.on('order status', (data) => {
            var data = decrypt(data);
            dispatch(updateOrderStatus({ data }))

        });
        socket.on('addon list', (data) => {
            var data = decrypt(data);
            console.log(data.res);
            dispatch(addonListUpdate({ loader: false, data: data.res }));

        });
        socket.on('Sick meal res', (data) => {
            var data = decrypt(data);
            dispatch(updateSickMealRes(data.res))


        });

        socket.on('Guest ID', (data) => {
            var data = decrypt(data);
            dispatch(socketSidupdate(data));
            dispatch(userUpdate({ islogged: false, email: data.id + '@gitam.edu', sid: data.id, name: 'Guest User', mobile: '' }));
            localStorage.setItem('user', JSON.stringify({ islogged: false, email: data.id + '@gitam.edu', sid: data.id, name: 'Guest User', mobile: '' }));
            socket.emit('join', encrypt({ id: data.id }));


        });
        socket.emit('getcafelist', encrypt({ 'getlist': 'getlist', campus: 'all' }));
        socket.on('order id', (data) => {
            var data = decrypt(data);
            navigate('/payment/' + data.id);
        });
        socket.on('Sub order id', (data) => {
            var data = decrypt(data);
            localStorage.setItem('package', JSON.stringify(data.item));
            navigate('/packagepayment/' + data.id);
        });

        socket.on('subscription', (data) => {
            var data = decrypt(data);
            dispatch(updateSubscription({ status: data.res.status, package: data.res.package[0], current_time: data.res.current_time }));
        });
        socket.on('Device Status', (data) => {
            var data = decrypt(data);
            if (data.data.status == 'no') {

                localStorage.clear();
                navigate(0);
            }
        });



        socket.on('usage', (data) => {
            var data = decrypt(data);
            dispatch(updateSubUsage({ usage: data.data }));
        });


        socket.on('Order Data', (data) => {
            var data = decrypt(data);
            dispatch(updateOrderData({ loader: false, order: data.data }));
        });
        socket.on('Orders', (data) => {
            var data = decrypt(data);


            dispatch(updateOrders({ loader: false, orders: data.data.records, next: data.data.next }));

        });
        socket.on('packages', (data) => {
            var data = decrypt(data);
            dispatch(updatePackages({ loader: false, packages: data.data }));
        });
        socket.on('OTP Sent', (data) => {
            var data = decrypt(data);
            dispatch(updateOTPRes({ data: data.res }));
        });

        socket.on('Payment res', (data) => {
            var data = decrypt(data);

            if (data.data.status === 'captured' || data.data.status === 'authorized' || data.data.status === 'failed') {
                // dispatch(updatePaymentModelStatus({ status: true }));
                //  navigate('/order/view/' + data.data.order_id);
                dispatch(updateCart({ mess_code: null, total: 0, items: [] }));
                localStorage.setItem('cart', JSON.stringify({ mess_code: null, total: 0, items: [] }));
                window.location.href = '/order/view/' + data.data.order_id;
            }

        });

        socket.on('User Data', (data) => {
            var data = decrypt(data);
            if (data.res.status === 'failed') {
                dispatch(updateOTPRes({ data: data.res }));
            } else {

                dispatch(socketSidupdate(data.res.user.user_id));
                dispatch(userUpdate({ islogged: true, email: data.res.user.email, sid: data.res.user.user_id, name: data.res.user.name, mobile: data.res.user.mobile }));
                localStorage.setItem('user', JSON.stringify({ islogged: true, email: data.res.user.email, sid: data.res.user.user_id, name: data.res.user.name, mobile: data.res.user.mobile }));
                socket.emit('join', encrypt({ id: data.res.user.user_id }));


                navigate('/');

            }

        });
        // socket.on('validate', (data) => {

        //     if (data.status == 'success') {
        //         sessionStorage.setItem("islogged", true);
        //         sessionStorage.setItem("email", data.data.email);
        //         sessionStorage.setItem("sid", data.data.sid);
        //         sessionStorage.setItem("name", data.data.name);
        //         dispatch(userUpdate({ data: { islogged: true, email: data.data.email, sid: data.data.sid, name: data.data.name } }));
        //         socket.emit('join', { id: data.data.sid });
        //         navigate(`/`);
        //     } else {
        //         dispatch(updateLoginStatus({ status: data }));
        //     }

        // });

        // socket.on("connect_error", (err) => {
        //     alert(JSON.stringify(err))
        // });
        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('selections');
        };
    }, []);

    const handleClickSendCommand = (cmd, data) => {
        socket.emit(cmd, encrypt(data));
    }

    return (
        <SocketContext.Provider value={
            {
                isConnected: readyState,
                sendCommand: handleClickSendCommand,
                userdata: userdata,
                socket: socket
            }
        }>
            {props.children}

        </SocketContext.Provider >
    )
}

export default SocketContext;