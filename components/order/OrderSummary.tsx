"use client"
import { useStore } from "@/src/store"
import { useMemo } from "react"
import ProductDetails from "./ProductDetails"
import formatCurrency from "@/src/utils"
import { jsPDF } from "jspdf"


export default function OrderSummary() {
    const order = useStore((state) => state.order)
    const clearOrder = useStore((state) => state.clearOrder)
    const subtotal = useMemo(() => order.reduce((total, item) => total + item.subtotal, 0), [order])
    const tax = useMemo(() => subtotal * 0.16, [subtotal])
    const total = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order])

    const generatePDF = () => {
        try {
            if (!order.length) return
            const doc = new jsPDF()
            const marginX = 15
            let y = 20

            // Header
            doc.setFontSize(18)
            doc.text("Disco Rayado Store", doc.internal.pageSize.getWidth() / 2, y, { align: "center" })
            y += 10
            doc.setFontSize(11)
            const now = new Date()
            const dateString = now.toLocaleDateString("es-MX", { year: 'numeric', month: '2-digit', day: '2-digit' })
            const timeString = now.toLocaleTimeString("es-MX", { hour: '2-digit', minute: '2-digit', second: '2-digit' })
            doc.text(`Fecha: ${dateString}  Hora: ${timeString}`, marginX, y)
            y += 8
            doc.line(marginX, y, doc.internal.pageSize.getWidth() - marginX, y)
            y += 6
            doc.setFontSize(12)
            doc.text("Productos:", marginX, y)
            y += 8

            // Productos
            order.forEach((item: any) => {
                const line = `${item.name}: ${formatCurrency(item.price)} x ${item.quantity} = ${formatCurrency(item.price * item.quantity)}`
                const splitLines = doc.splitTextToSize(line, doc.internal.pageSize.getWidth() - marginX * 2)
                splitLines.forEach((txt: string) => {
                    if (y > doc.internal.pageSize.getHeight() - 20) {
                        doc.addPage()
                        y = 20
                    }
                    doc.text(txt, marginX, y)
                    y += 6
                })
            })

            if (y > doc.internal.pageSize.getHeight() - 40) {
                doc.addPage()
                y = 20
            }

            // Pedido 
            y += 4
            doc.line(marginX, y, doc.internal.pageSize.getWidth() - marginX, y)
            y += 8
            const totalProductos = order.reduce((total, item) => total + item.quantity, 0)
            const subtotalValue = order.reduce((total, item) => total + (item.subtotal ?? item.price * item.quantity), 0)
            const taxValue = subtotalValue * 0.16
            const totalValue = subtotalValue + taxValue
            const summaryLines = [
                `Cantidad de productos: ${totalProductos}`,
                `Subtotal: ${formatCurrency(subtotalValue)}`,
                `Impuestos (16%): ${formatCurrency(taxValue)}`,
                `Total a pagar: ${formatCurrency(totalValue)}`
            ]
            summaryLines.forEach(line => {
                if (y > doc.internal.pageSize.getHeight() - 20) {
                    doc.addPage()
                    y = 20
                }
                doc.text(line, marginX, y)
                y += 6
            })

            //Mensajito de agradecimiento
            doc.setFontSize(9)
            if (y > doc.internal.pageSize.getHeight() - 15) {
                doc.addPage()
                y = 20
            }
            y += 4
            doc.text("Gracias por su compra.", marginX, y)
            
            // Guardar PDF y formatear nombre
            const pad = (n: number) => String(n).padStart(2, '0')
            const day = pad(now.getDate())
            const month = pad(now.getMonth() + 1)
            const year = String(now.getFullYear())
            const hour = pad(now.getHours())
            const minute = pad(now.getMinutes())
            const second = pad(now.getSeconds())
            const fileName = `reciboDRS_${day} ${month} ${year}_${hour} ${minute} ${second}.pdf`
            doc.save(fileName)
            // Vaciar carrito después de generar el PDF
            clearOrder()
        } catch (e) {
            console.error('Error generando PDF', e)
        }
    }

    return (
        <aside className="lg:h-screen lg:overflow-y-auto md:w-64 lg:w-96 p-5 bg-white/80 shadow-lg rounded-md">
            <h1 className="text-xl md:text-2xl font-black text-center">Mi Pedido</h1>

            {order.length === 0 ? (
                <p className="text-center text-gray-600 mt-6">El carrito está vacío</p>
            ) : (
                <div className="mt-4 space-y-4">
                    <div className="space-y-3">
                        {order.map((item: any) => (
                            <ProductDetails key={item.id} item={item} />
                        ))}
                    </div>

                    <div className="mt-6 border-t pt-6">
                        <p className="text-lg text-center">
                            Cant. de Productos:{" "}
                            <span className="font-bold">{order.reduce((total, item) => total + item.quantity, 0)}</span>
                        </p>
                        <p className="text-xl text-center">
                            Subtotal:{" "}
                            <span className="font-bold">{formatCurrency(subtotal)}</span>
                        </p>
                        <p className="text-xl text-center">
                            Impuestos (16%):{" "}
                            <span className="font-bold">{formatCurrency(tax)}</span>
                        </p>
                        <p className="text-lg md:text-2xl text-center">
                            Total a pagar:{' '}
                            <span className="font-bold">{formatCurrency(total+tax)}</span>
                        </p>
                    </div>
                     <button
                        className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-2xl shadow-md transition-colors"
                        onClick={generatePDF}
                    >
                        Generar Recibo
                    </button>
                </div>
            )}
        </aside>
    )
}