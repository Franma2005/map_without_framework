import { useEffect, useState } from "react";
import { Platform, PermissionsAndroid } from "react-native";

interface Coordinates {
    latitude: number,
    longitude: number,
}

export const locationHook = () => {
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
            console.log('En iOS los permisos se gestionan distinto');
        }
    }

    //* Este useEffect se va a ejecutar siempre cuandoo se abra el dispositivo y me va a detectar la plataforma. Uso un useEffect para mega asegurarme
    //* de que se va a ejecutar
    useEffect(() => { askPermision() }, []);

    //* 
    useEffect(() => {

    }, []);
    
}