"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"

export async function getAllInventoryItems() {
  try {
    const items = await db.purchaseReceipt.findMany()

    return items.map((item) => ({
      ...item,
      price: item.price || 29.99,
      stock: item.stock || 10,
      compatibilityCars: item.compatibilityCars || [],
    }))
  } catch (error) {
    console.error("Failed to get inventory items:", error)
    return []
  }
}

export async function searchInventoryItems(searchType, searchTerm) {
  try {
    const items = await db.purchaseReceipt.findMany()

    const processedItems = items.map((item) => ({
      ...item,
      price: item.price || 29.99,
      stock: item.stock || 10,
      compatibilityCars: item.compatibilityCars || [],
    }))

    return processedItems.filter((item) => {
      switch (searchType) {
        case "sku":
          return item.invoice.toLowerCase().includes(searchTerm.toLowerCase())
        case "name":
          return item.compatibilityCars.some(
            (car) =>
              car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
              car.model.toLowerCase().includes(searchTerm.toLowerCase()),
          )
        case "retailName":
          return item.retailName.toLowerCase().includes(searchTerm.toLowerCase())
        default:
          return true
      }
    })
  } catch (error) {
    console.error("Failed to search inventory items:", error)
    return []
  }
}

export async function updateInventoryItem(data) {
  try {
    const { id, ...updateData } = data
    const updatedItem = await db.purchaseReceipt.update(id, updateData)

    if (!updatedItem) {
      return {
        success: false,
        error: "Item not found",
      }
    }

    revalidatePath("/inventory/manage")
    revalidatePath("/dashboard")

    return {
      success: true,
      item: updatedItem,
    }
  } catch (error) {
    console.error("Failed to update inventory item:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update inventory item",
    }
  }
}

export async function deleteInventoryItem(id) {
  try {
    const success = await db.purchaseReceipt.delete(id)

    if (!success) {
      return {
        success: false,
        error: "Item not found",
      }
    }

    revalidatePath("/inventory/manage")
    revalidatePath("/dashboard")

    return {
      success: true,
    }
  } catch (error) {
    console.error("Failed to delete inventory item:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete inventory item",
    }
  }
}


// Ensure each item has the required properties
export interface InventoryItem {
  id: string
  invoice: string
  price: number
  stock: number
  retailName: string
  compatibilityCars: CompatibilityCar[]
  createdAt: string
}

export interface CompatibilityCar {
  brand: string
  model: string
  year: string
}

