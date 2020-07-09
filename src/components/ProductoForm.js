import React, { useState, useEffect } from "react";
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/Productos";
import { useToasts } from "react-toast-notifications";

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    },
    smMargin: {
        margin: theme.spacing(1)
    }
})

const initialFieldValues = {
    name: '',
    price: '',
    description: '',
    stock: '',
    category: '',
    link: '',
    cantidad: ''

}
var currentS = 0;
const ProductoForm = ({ classes, ...props }) => {

    //toast msg.
    const { addToast } = useToasts()

    //validate()
    //validate({fullName:'jenny'})
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        if ('price' in fieldValues)
            temp.price = fieldValues.price ? "" : "This field is required."
        if ('category' in fieldValues)
            temp.category = fieldValues.category ? "" : "This field is required."
        if ('description' in fieldValues)
            temp.description = fieldValues.description ? "" : "This field is required."
        setErrors({
            ...temp
        })
        currentS = fieldValues.stock * 2;
        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
        return true;

    }
    const validateStock = (fieldValues = values) => {
        let temp = { ...errors }
        if ('stock' <= fieldValues.stock)
            return false;
        return true;
    }
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    //material-ui select
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const onSuccess = () => {
                resetForm()
                addToast("Submitted successfully", { appearance: 'success' })
            }
            if (props.currentId == 0)
                props.createProducto(values, onSuccess)
            else {
                var salida = values.stock - values.cantidad;

                if (salida < 0) {
                    addToast("Stock insuficiente", { appearance: 'info' })
                    
                }
                else{
                    values.stock = salida;
                    values.cantidad = 0;
                    props.updateProducto(props.currentId, values, onSuccess)
                }
            }
        }
    }

    useEffect(() => {
        if (props.currentId != 0) {
            setValues({
                ...props.ProductoList.find(x => x.id == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <FormControl variant="outlined"
                        className={classes.formControl}
                        {...(errors.category && { error: true })}
                    >
                        <InputLabel ref={inputLabel}>Categoria</InputLabel>
                        <Select
                            name="category"
                            value={values.category}
                            onChange={handleInputChange}
                            labelWidth={labelWidth}
                        >
                            <MenuItem value="">Seleccione una Categoria</MenuItem>
                            <MenuItem value="f">Frutas</MenuItem>
                            <MenuItem value="t">Verduras</MenuItem>

                        </Select>
                        {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
                    </FormControl>
                    <TextField
                        name="name"
                        variant="outlined"
                        label="Nombre de producto"
                        value={values.name}
                        onChange={handleInputChange}
                        {...(errors.name && { error: true, helperText: errors.name })}
                    />
                    <TextField
                        name="description"
                        variant="outlined"
                        label="Descripcion"
                        value={values.description}
                        onChange={handleInputChange}
                        {...(errors.description && { error: true, helperText: errors.description })}
                    />

                </Grid>
                <Grid item xs={6}>

                    <TextField
                        name="price"
                        variant="outlined"
                        label="Precio"
                        value={values.price}
                        onChange={handleInputChange}
                        {...(errors.price && { error: true, helperText: errors.price })}
                    />
                    <TextField
                        name="cantidad"
                        variant="outlined"
                        label="Cantidad"
                        value={values.cantidad}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="stock"
                        variant="outlined"
                        label="Stock"
                        value={values.stock}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="link"
                        variant="outlined"
                        label="Link"
                        value={values.link}
                        onChange={handleInputChange}
                    />
                    <div>
                        <Button
                            variant="contained"
                            className={classes.smMargin}
                            onClick={resetForm}
                        >
                            Limpiar
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.smMargin}
                        >
                            Check out
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
}


const mapStateToProps = state => ({
    ProductoList: state.Productos.list
})

const mapActionToProps = {
    createProducto: actions.create,
    updateProducto: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(ProductoForm));