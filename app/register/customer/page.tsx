"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { saveCustomerDetails } from "@/lib/customer-actions"
import { type ComboboxOption } from "@/components/ui/combobox"
import Layout from "@/components/kokonutui/layout"
import validator from "validator"


const formSchema = z.object({
    name: z.string().min(2, "Nama min 2 huruf"),
    // email: z.string().email("Invalid email address"),
    phone: z.string().refine(validator.isMobilePhone),
    address: z.string().min(5, "Alamat tidak lengkap"),
    ktp: z.string().min(16, "Nomor KTP harus 16 digit").max(16, "Nomor KTP harus 16 digit"),
    kota: z.string().min(5, "Kota min 5 huruf"),
    dob: z.string().min(5, "Tgl. lahir minimal 5 huruf"),
    kecamatan: z.string().min(5, "Kecamatan min 5 huruf")
})

type FormValues = z.infer<typeof formSchema>

export default function CustomerRegistrationPage() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [city, setCity] = useState<ComboboxOption[]>([])

    // Clear any existing registration data when starting a new registration
    useEffect(() => {
        sessionStorage.removeItem("registrationCustomerId")
        sessionStorage.removeItem("registrationVehicleId")
    }, [])

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ktp: "",
            name: "",
            kota: "",
            dob: "",
            phone: "",
            address: "",
            kecamatan: "",
        },
    })

    // // Load car models when a brand is selected
    // const loadCarModels = async (brand: string) => {
    //     if (!brand || carModels[brand]) return

    //     const models = await getCarModelsByBrand(brand)
    //     setCarModels((prev) => ({
    //         ...prev,
    //         [brand]: models.map((model) => ({ value: model, label: model })),
    //     }))
    // }

    async function onSubmit(values: FormValues) {
        setIsSubmitting(true)

        try {
            const result = await saveCustomerDetails(values)

            // Store customer ID in session storage to maintain state across registration pages
            if (result.customerId) {
                sessionStorage.setItem("registrationCustomerId", result.customerId)
                console.log("registrationCustomerId", result.customerId)
                router.push("/register/vehicle")
            } else {
                console.error("Failed to save customer details:", result.error)
                setIsSubmitting(false)
            }
        } catch (error) {
            console.error("Error saving customer details:", error)
            setIsSubmitting(false)
        }
    }

    return (
        <Layout>
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-4">
                        <h1 className="text-3xl font-bold">Registrasi Baru</h1>
                        {/* <PageContainer> */}
                        {/* <PageHeader title="Register New Customer">
                    <Button variant="outline" onClick={() => router.back()}>
                        Cancel
                    </Button>
                </PageHeader> */}
                        {/* <h1 className="text-3xl font-bold">Pencarian Suku Cadang</h1> */}
                        {/* <div className="container mx-auto py-10"> */}
                        {/* <div className="flex justify-end mb-4">
                <Clock />
            </div> */}
                    </div>
                </div>
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Halaman Customer</CardTitle>
                        <CardDescription>Langkah 1 dari 3: Input data pribadi</CardDescription>
                    </CardHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <CardContent className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="ktp"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>No. KTP/NPWP*</FormLabel>
                                            <FormControl>
                                                <Input placeholder="31700000000000" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nama*</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Budi Sanjaya" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Alamat*</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Jalan, No, RT/RW, Kelurahan" className="resize-none" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="dob"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>DOB*</FormLabel>
                                                <FormControl>
                                                    <Input type="date" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Telepon*</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="(123) 456-7890" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="kecamatan"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Kecamatan*</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Pilih" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="kota"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Kota*</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Kota" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* <FormField
                                    control={form.control}
                                    name="kota"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Kota</FormLabel>
                                            <FormControl>
                                                <Combobox
                                                    options={city}
                                                    value={field.value}
                                                    onChange={(value) => {
                                                        field.onChange(value)
                                                        // Reset model when make changes
                                                        form.setValue("kota", "")
                                                        // Load models for this make
                                                        // loadCarModels(value)
                                                    }}
                                                    placeholder="Select or type make"
                                                    emptyMessage="No makes found."
                                                    allowCustomValue={true}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                /> */}
                            </CardContent>

                            <CardFooter className="flex justify-between py-10">
                                <Button type="button" variant="outline" onClick={() => router.push("/register")}>
                                    Batal
                                </Button>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? "Saving..." : "Lanjut: Detail Kendaraan"}
                                </Button>
                            </CardFooter>
                        </form>
                    </Form>
                </Card>
            </div>
            {/* </PageContainer> */}
        </Layout>
    )
}

