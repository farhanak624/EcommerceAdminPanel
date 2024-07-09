import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';


const Invoice = () => {

    const location = useLocation();
    const [invoiceData, setInvoiceData] = useState(location.state?.order || null);
    const [productData, setProductData] = useState(location.state?.product || null);

  console.log("invoiceData:", invoiceData)
  console.log("productData:", productData)
    return (
        <>
            <PDFViewer style={{ width: '100%', height: '100vh' }}>
                <Document>
                    <Page size="A4" style={{padding: 20}}>
                        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 8, shadow: '5px 5px 5px #888888', padding: 20 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                                <Image src='/invoiceZoco.png' style={{ width: 140, height: 55 }} />
                                <View style={{ paddingVertical: 8, width:90, alignItems: 'center' }}>
                                    <Text style={{ backgroundColor: '#757575', color: '#FFFFFF', padding: '4px 8px' }}>Invoice</Text>
                                </View>
                            </View>
                            
                            <View style={{ paddingVertical: 8, marginBottom: 12, flexDirection: 'row', flexWrap: 'wrap', fontSize: 10, justifyContent: 'space-between' }}>
                                {/* Left Section */}
                                <View style={{  marginBottom: 8 }}>
                                    <View style={{ marginBottom: 16 }}>
                                        <Text style={{ fontWeight: 'bold', width: 100, fontSize: 12, marginBottom: 4 }}>Bill Address</Text>
                                        <Text>{`${invoiceData?.invoiceDetails?.billAddress?.address}, ${invoiceData?.invoiceDetails?.billAddress?.city}`}</Text>
                                        <Text>{`${invoiceData?.invoiceDetails?.billAddress?.state}, ${invoiceData?.invoiceDetails?.billAddress?.pincode}`}</Text>
                                    </View>
                                    <View style={{ marginBottom: 6 }}>
                                        <Text style={{ fontWeight: 'bold', width: 100, fontSize: 12, marginBottom: 4 }}>Shipping Address</Text>
                                        <Text>{`${invoiceData?.invoiceDetails?.billAddress?.address}, ${invoiceData?.invoiceDetails?.billAddress?.city}`}</Text>
                                        <Text>{`${invoiceData?.invoiceDetails?.billAddress?.state}, ${invoiceData?.invoiceDetails?.billAddress?.pincode}`}</Text>
                                    </View>
                                </View>

                                {/* Right Section */}
                                <View style={{ marginBottom: 12 }}>
                                    <View style={{ flexDirection: 'row', marginBottom: 6 }}>
                                        <Text style={{ fontWeight: 'bold' }}>INVOICE: </Text>
                                        <Text>{invoiceData?.invoiceDetails?.orderId.slice(-6)}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginBottom: 6 }}>
                                        <Text style={{ fontWeight: 'bold' }}>Date: </Text>
                                        <Text>{invoiceData?.invoiceDetails?.orderDate.substring(0, 10)}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginBottom: 12, borderBottomWidth: 2, borderColor: '#E0E0E0'}}>
                                <View style={{ flexDirection: 'row', paddingBottom: 4, fontSize: 12, backgroundColor:'#E0E0E0' }}>
                                    <Text style={{ flex: 1, textAlign: 'center' }}>Product Name</Text>
                                    <Text style={{ flex: 1, textAlign: 'center' }}>Quantity</Text>
                                    <Text style={{ flex: 1, textAlign: 'center' }}>Price</Text>
                                    <Text style={{ flex: 1, textAlign: 'center' }}>Tax</Text>
                                    <Text style={{ flex: 1, textAlign: 'center' }}>Amount</Text>
                                </View>
                                {/* Render items */}
                                {productData ? (
                                    <View style={{ flexDirection: 'row', paddingVertical: 4, fontSize: 10  }}>
                                        <Text style={{ flex: 1, textAlign: 'center' }}>{productData?.productName}</Text>
                                        <Text style={{ flex: 1, textAlign: 'center' }}>{productData?.quantity}</Text>
                                        <Text style={{ flex: 1, textAlign: 'center' }}>{productData?.price}</Text>
                                        <Text style={{ flex: 1, textAlign: 'center' }}>{productData?.Gst}</Text>
                                        <Text style={{ flex: 1, textAlign: 'center' }}>${productData?.subTotal.toFixed(2)}</Text>
                                    </View>
                                ) : (
                                    invoiceData?.response.map((item, index) => (
                                        <View key={index} style={{ flexDirection: 'row', paddingVertical: 4, fontSize: 10  }}>
                                            <Text style={{ flex: 1, textAlign: 'center' }}>{item.productName}</Text>
                                            <Text style={{ flex: 1, textAlign: 'center' }}>{item.quantity}</Text>
                                            <Text style={{ flex: 1, textAlign: 'center' }}>{item.price}</Text>
                                            <Text style={{ flex: 1, textAlign: 'center' }}>{item.Gst}</Text>
                                            <Text style={{ flex: 1, textAlign: 'center' }}>${item.subTotal.toFixed(2)}</Text>
                                        </View>
                                    ))
                                )}
                               
                            </View>
                            {/* <View style={{ height: 15, backgroundColor: '#2F4EFF' }}></View> */}
                            <View style={{ paddingVertical: 8, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-end'  }}>
                                {productData ? (
                                    <View style={{ width: '100%', maxWidth: '30%', fontSize: 14 }}>
                                    <View style={{ flexDirection: 'row', marginBottom: 4 }}>
                                        <Text style={{ fontWeight: 'bold', width: 100 }}>Subtotal</Text>
                                        <Text>: {productData.subTotal}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginBottom: 4 }}>
                                        <Text style={{ fontWeight: 'bold', width: 100 }}>Tax</Text>
                                        <Text>: {productData.Gst}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginBottom: 4, backgroundColor:'#E0E0E0' }}>
                                        <Text style={{ fontWeight: 'bold', width: 100 }}>Total</Text>
                                        <Text>: {productData.total}</Text>
                                    </View>
                                </View>
                                ) : (
                                    <View style={{ width: '100%', maxWidth: '30%', fontSize: 14 }}>
                                    <View style={{ flexDirection: 'row', marginBottom: 4 }}>
                                        <Text style={{ fontWeight: 'bold', width: 100 }}>Subtotal</Text>
                                        <Text>: {invoiceData?.invoiceDetails?.totalPrice}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginBottom: 4 }}>
                                        <Text style={{ fontWeight: 'bold', width: 100 }}>Tax</Text>
                                        <Text>: {invoiceData?.invoiceDetails?.tax}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginBottom: 4, backgroundColor:'#E0E0E0'  }}>
                                        <Text style={{ fontWeight: 'bold', width: 100 }}>Total</Text>
                                        <Text>: {invoiceData?.invoiceDetails?.totalSubTotal}</Text>
                                    </View>
                                </View>
                                )}
                                
                            </View>
                        </View>
                        {/* <Image src='/invoiceBottom.png' style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}/> */}
                    </Page>
                </Document>
            </PDFViewer>
       </>
    );
};

export default Invoice;

