import { useEffect, useState } from "react";
import { Platform, PermissionsAndroid } from "react-native";
import Geolocation from 'react-native-geolocation-service';

export interface Coordinates {
    latitude: number,
    longitude: number,
}

export const locationHook = ():Coordinates => {
    //* Hook que contiene las coordenadas de localizacion
    const [location, setLocation] = useState(<Coordinates>{
        latitude: 0,
        longitude: 0,
    });

    //* Función del primer useEffect
    async function askPermision(): Promise<void> {
        if (Platform.OS === 'android') {
            //* Esta linea va a esperar a que el usuario acepte los permisos
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            //* Debuggeamos para ver si esta funcionando correctamente
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Permiso concedido para acceder a la ubicación');
            } else {
                console.log('Permiso denegado para acceder a la ubicación');
            }
        } else {
            console.log('En iOS los permisos se gestionan de forma predeterminda');
        }
    }

    //* Función para actualizar la localización
    function watchLocation(): number {
        //* Usamos Geolocation.watchPosition porque es un evento que nos permite realizar algo cada vez que se actualice la posición
        const watchId = Geolocation.watchPosition(
            //* Esto introduce en set location las coordenadas
            (position) => {
                setLocation(position.coords);
            },
            //! En el caso de que algo valla mal se lanza un error
            (error) => {
                throw error;
            },
            {
                enableHighAccuracy: true, //! Usar alta precisión
                distanceFilter: 10,        //! Actualizar solo cuando se mueva 10 metros
            }
        );

        return watchId;
    }

    //* Este useEffect se va a ejecutar siempre cuandoo se abra el dispositivo y me va a detectar la plataforma. Uso un useEffect para mega asegurarme
    //* de que se va a ejecutar
    useEffect(() => { askPermision() }, []);

    //* Este useEffect se va a ejecutar una unica vez al iniciar el programa. El watchLocation() es una funcion que contiene un evento de observación
    useEffect(() => {
        const watchId = watchLocation();
        return () => Geolocation.clearWatch(watchId);
     }, []);

     //* Devolvemos location
     return (location);
}