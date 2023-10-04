import * as React from 'react';
import { createContext, useEffect, useState, useRef } from 'react';
import Box from '@mui/joy/Box';
import Drawer from '@mui/joy/Drawer';
import Button from '@mui/joy/Button';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import ModalClose from '@mui/joy/ModalClose';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Stack from '@mui/joy/Stack';
import RadioGroup from '@mui/joy/RadioGroup';
import Sheet from '@mui/joy/Sheet';
import SearchIcon from '@mui/icons-material/Search';
import "./drawer.css"
import { useToken } from '../tokenProvaider';
import { useNavigate } from 'react-router-dom';

export default function DrawerFilters(props) {
    const { token} = useToken();
    const [open, setOpen] = React.useState(false);
    const [type, setType] = React.useState('Guesthouse');
    const autor = useRef(null);
    const titulo = useRef(null);
    const [info, setInfo] = useState({
        author: "",
        title: "",
    })
    const [response, setResponse] = useState({
        response: '',
    })
    
    const handleAutor = (e) => {
        e.preventDefault();
        getBooksAutors();
        autor.current.value = '';
        setOpen(false)
    }
    const handleTitle = (e) => {
        e.preventDefault();
        getBooksTitle()
        titulo.current.value = '';
        setOpen(false)
    }
    const handleEditorial = () => {
        getBooksEditorial()
        setOpen(false)
    }
    const handleAviable = () => {
        getAviableBooks()
        setOpen(false)
    }
    const handleLast = () => {
        getLastBooks()
        setOpen(false)
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setInfo({
            ...info,
            [name]: value
        });
    }
    
    async function getBooksAutors(){
        const res = await fetch(`http://${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}/api/use/bookAuthor?name=${info.author}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept-Version": "2.0.0",
                "Authorization": `Bearer ${token}`
            }
        });
        if(res.status === 200){
            const response = await res.json();
            setResponse(response)
            props.onDataFetched(response);
            return response;
        }
        else{
            alert("error trayendo los datos");
        } 
    }
    async function getBooksTitle(){
        const res = await fetch(`http://${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}/api/use/bookTitle?name=${info.title}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept-Version": "2.0.0",
                "Authorization": `Bearer ${token}`
            }
        });
        if(res.status === 200){
            const response = await res.json();
            setResponse(response);
            props.onDataFetched(response);
            return response;
        }
        else{
            alert("error trayendo los datos");
        } 
    }
    async function getBooksEditorial(){
        const res = await fetch(`http://${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}/api/use/bookEditorial`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept-Version": "2.0.0",
                "Authorization": `Bearer ${token}`
            }
        });
        if(res.status === 200){
            const response = await res.json();
            setResponse(response);
            props.onDataFetched(response);
            return response;
        }
        else{
            alert("error trayendo los datos");
        } 
    }
    async function getAviableBooks(){
        const res = await fetch(`http://${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}/api/use/bookAviability`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept-Version": "2.0.0",
                "Authorization": `Bearer ${token}`
            }
        });
        if(res.status === 200){
            const response = await res.json();
            setResponse(response);
            props.onDataFetched(response);
            return response;
        }
        else{
            alert("error trayendo los datos");
        } 
    }
    async function getLastBooks(){
        const res = await fetch(`http://${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}/api/use/bookYear?year=2023`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept-Version": "2.0.0",
                "Authorization": `Bearer ${token}`
            }
        });
        if(res.status === 200){
            const response = await res.json();
            setResponse(response);
            props.onDataFetched(response);
            return response;
        }
        else{
            alert("error trayendo los datos");
        } 
    }
    
    return (
        <React.Fragment>
            <Button
                className='buttonOptions'
                sx={{backgroundColor: '#9381FF'}}
                onClick={() => setOpen(true)}
            >
                Ver todas las opciones
            </Button>
            <Drawer
                size="md"
                variant="plain"
                open={open}
                onClose={() => setOpen(false)}
                slotProps={{
                    content: {
                        sx: {
                            bgcolor: 'transparent',
                            p: { md: 3, sm: 0 },
                            boxShadow: 'none',
                        },
                    },
                }}
            >
                <Sheet
                    sx={{
                        borderRadius: 'md',
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        height: '100%',
                        overflow: 'auto'
                    }}
                >
                    <DialogTitle>Opciones Avanzadas</DialogTitle>
                    <ModalClose />
                    <Divider sx={{ mt: 'auto' }} />
                    <DialogContent sx={{ gap: 2 }}>
                        <FormControl>
                            <FormLabel sx={{ fontWeight: 'bold' }}>
                                Filtrar
                            </FormLabel>
                            <RadioGroup
                                value={type || ''}
                                onChange={(event) => {
                                    setType(event.target.value);
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: '100%'
                                    }}
                                >
                                    <p className='pInDrawer'>Búsqueda por autor</p>
                                    <form onSubmit={(e) => { handleAutor(e) }}>
                                        <input
                                            className='inputDrawer'
                                            type="text"
                                            placeholder='author name'
                                            name='author'
                                            onChange={handleInputChange}
                                            required
                                            ref={autor} />
                                        <button  className='loop' type='submit'><SearchIcon/></button>
                                    </form>
                                    <p className='pInDrawer'>Búsqueda por título</p>
                                    <form onSubmit={(e) => { handleTitle(e) }}>
                                        <input
                                            className='inputDrawer'
                                            type="text"
                                            placeholder='book title'
                                            name='title'
                                            onChange={handleInputChange}
                                            required
                                            ref={titulo} />
                                        <button className='loop'  type='submit'><SearchIcon/></button>
                                    </form>
                                    <Box sx={{display: 'flex', flexWrap: 'warp', marginTop: '7%'}}>
                                    <button className='botonDelDrawer' onClick={handleEditorial} >Editoriales</button>
                                    <button className='botonDelDrawer' onClick={handleAviable}>Solo libros disponibles</button>
                                    <button className='botonDelDrawer' onClick={handleLast}>Últimos libros añadidos</button>
                                    </Box>
                                </Box>
                            </RadioGroup>
                        </FormControl>
                    </DialogContent>

                    <Divider sx={{ mt: 'auto' }} />
                    <Stack
                        direction="row"
                        justifyContent="end"
                        useFlexGap
                        spacing={1}
                    >
                        <Button sx={{backgroundColor: '#9381FF'}} onClick={() => setOpen(false)}>Pedir un libro</Button>
                    </Stack>
                </Sheet>
            </Drawer>
        </React.Fragment>
    );
}