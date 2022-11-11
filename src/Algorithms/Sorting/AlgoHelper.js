

export function Swap(num_array,color_array, i , j ) {
    
    let a = num_array[i];
    let b = num_array[j];
    num_array[i] = b;
    num_array[j] = a;

    //color swap
    a = color_array[i];
    b = color_array[j];
    color_array[i] = b;
    color_array[j] = a;
    
}
