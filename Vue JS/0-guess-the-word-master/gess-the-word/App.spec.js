/**
 * @vitest-environment jsdom
 */
import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest"
import Popup from "./src/components/Popup.vue";
import App from "./src/App.vue"

describe("App.vue integratuon avec Popup", () => {
    it("affiche le popup quand success = true", async () => {
        const wrapper = mount(App)
        await wrapper.setData({ 
            showPopup: true,
            popupSuccess: true,
         })

        const popup = wrapper.findComponent(Popup)

        expect(popup.exists()).toBe(true)
        expect(popup.props("success")).toBe(true)
    })
})