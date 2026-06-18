import { mount } from "@vue/test-utils"
import { describe, it, expect } from "vitest"
import Popup from "./src/components/Popup.vue"

describe("Popup.vue", () => {
    it("affiche le popup de victoire avec le bon resultat.", () => {
        const wrapper = mount(Popup, {
            props: {
                success: true,
                result: "Bravo",
                message: "Vous avez trouvé le mot !"
            }
        })

        const title = wrapper.find("h2")
        expect(title.text()).toContain("Victoire")

        const modal = wrapper.find(".fixed")
        expect(modal.exists()).toBe(true)
    })

      it("émets l'événement 'restart' quand le bouton est cliqué", async () => {
    const wrapper = mount(Popup, {
      props: {
        success: true, 
        result: "Bravo",
        message: "Vous avez gagné !"
      }
    })
     
    const button = wrapper.find("button")
    await button.trigger("click")

    expect(wrapper.emitted("restart")).toBeTruthy()
    })
})