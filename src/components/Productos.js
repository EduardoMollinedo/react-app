import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/Productos";
import { Grid, Paper, TableContainer, Table, TableHead, FormControl, TableRow, InputLabel, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import ProductoForm from "./ProductoForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from '@material-ui/icons/Add';
import { useToasts } from "react-toast-notifications";



const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})

const Productos = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0)
    useEffect(() => {
        props.getAllProductos()
    }, [])//componentDidMount

    //toast msg.
    const { addToast } = useToasts()

   /* const onDelete = id => {
        if (window.confirm('Eliminar elemento?'))
            props.deleteProducto(id, () => addToast("Eliminado", { appearance: 'info' }))
    }*/
    const fruta = () => {
        props.getAllProductos("f")
        addToast("Fruta", { appearance: 'info' })
    }
    const verdura = () => {
        props.getAllProductos("v")
        addToast("Verdura", { appearance: 'info' })
    }
    return (
        <Paper className={classes.paper} elevation={3} >
            <Grid container alignItems="center" justify="center" direction="column">
                <Grid container alignItems="center" justify="center">
                    <Button
                        variant="contained"
                        className={classes.smMargin}
                        onClick={fruta}
                    >
                        FRUTAS
                        </Button>
                    <Button
                        variant="contained"
                        className={classes.smMargin}
                        onClick={verdura}
                    >
                        VERDURAS
                        </Button>
                </Grid>

                <Grid item xs={12}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Producto</TableCell>
                                    <TableCell>Precio</TableCell>
                                    <TableCell>Descripcion</TableCell>
                                    <TableCell>Imagen</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.ProductoList.map((record, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>{record.name}</TableCell>
                                            <TableCell>{record.price}</TableCell>
                                            <TableCell>{record.description}</TableCell>
                                            <TableCell>
                                                <img src={record.link} style={{
                                                    width: 80,
                                                    height: 80,
                                                    marginRight: 10,
                                                    marginBottom: 12,
                                                    marginTop: 12
                                                }} />


                                            </TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button><AddIcon color="primary"
                                                        onClick={() => { setCurrentId(record.id) }} /></Button>

                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={6}>
                    <ProductoForm {...({ currentId, setCurrentId })} />
                </Grid>



            </Grid>

        </Paper>
    );
}

const mapStateToProps = state => ({
    ProductoList: state.Productos.list
})

const mapActionToProps = {
    getFrutas: actions.getFrutas,
    getVerduras: actions.getVerduras,
    getAllProductos: actions.getAll,
    deleteProducto: actions.Delete,
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Productos));