import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import App from './App.vue'

describe('App.vue', () => {
  it("génère l'URL du QRCode et affiche l'image", async () => {
    const wrapper = mount(App)

    const input = wrapper.find('input[type="text"]')
    await input.setValue('https://example.com')

    const button = wrapper.find('button')
    await button.trigger('click')

    const qrImage = wrapper.find('img[alt="QR Code"]')
    expect(qrImage.exists()).toBe(true)

    const src = qrImage.attributes('src')
    expect(src).toContain('https://api.qrserver.com/v1/create-qr-code/')
    expect(src).toContain('data=https%3A%2F%2Fexample.com')
  })

  it("affiche un message d'erreur si l'URl est vide et n'affiche pas d'image", async () => {
    const wrapper = mount(App)

    const input = wrapper.find('input[type="text"]')
    await input.setValue('')

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(wrapper.text()).not.toContain("Impossible de charger le QrCOde")

    const qrImage = wrapper.find('img[alt="QR Code"]')
    expect(qrImage.exists()).toBe(false)
  })

  it("gère l'erreur de chargement du QRCode", async () => {
    const wrapper = mount(App)

    await wrapper.find("input[type='text']").setValue('https://example.com')
    await wrapper.find('button').trigger('click')

    const qrImage = wrapper.find('img[alt="QR Code"]')
    await qrImage.trigger('error')

    expect(wrapper.text()).toContain("Impossible de charger le QrCOde")
    expect(wrapper.find('.box').exists()).toBe(true)
  })  

  
  it('télécharge le QR code en appelant fetch et en créant un blob', async () => {
    const mockBlob = new Blob(['dummy'], { type: 'image/png' })

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      blob: async () => mockBlob,
    })
    vi.stubGlobal('fetch', fetchMock)

    const createObjectURLSpy = vi.spyOn(URL, 'createObjectURL')
    const revokeObjectURLSpy = vi.spyOn(URL, 'revokeObjectURL')

    const wrapper = mount(App)
    await wrapper.find('input[type="text"]').setValue('https://example.com')
    await wrapper.find('button').trigger('click')

    const downloadButton = wrapper.findAll('button').find((button) =>
      button.text().includes('Download')
    )
    await downloadButton.trigger('click')

    const qrImage = wrapper.find('img[alt="QR Code"]')
    const src = qrImage.attributes('src')

    expect(fetchMock).toHaveBeenCalledWith(src)
    expect(createObjectURLSpy).toHaveBeenCalledWith(mockBlob)
    expect(revokeObjectURLSpy).toHaveBeenCalled()

    fetchMock.mockRestore()
    createObjectURLSpy.mockRestore()
    revokeObjectURLSpy.mockRestore()
  })

  it("copie le lien du qrcode dans le presse-papiers si navigator.share est absent", async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined)
    vi.stubGlobal('navigator', {
      share: undefined,
      clipboard: { writeText: writeTextMock },
    })
    
    const wrapper = mount(App)
    await wrapper.find('input[type="text"]').setValue('https://example.com')
    await wrapper.find('button').trigger('click')

    const shareButton = wrapper.findAll('button').find(b => b.text().includes('Share'))
    await shareButton.trigger('click')

    const qrImage = wrapper.find("img[alt='QR Code']")
    const src = qrImage.attributes('src')

    expect(writeTextMock).toHaveBeenCalledWith(src)

    expect(wrapper.text()).toContain("Lien copié dans le presse-papiers")

    vi.restoreAllMocks()
  })

  it('affiche le formulaire avant génération et la vue QR après génération', async () => {
  const wrapper = mount(App)

  // avant génération : formulaire visible, vue QR invisible
  expect(wrapper.find('.box').exists()).toBe(true)
  expect(wrapper.find('.show').exists()).toBe(false)

  // générer le QR
  await wrapper.find('input[type="text"]').setValue('https://example.com')
  await wrapper.find('button').trigger('click')

  // après génération : vue QR visible, formulaire caché
  expect(wrapper.find('.box').exists()).toBe(false)
  expect(wrapper.find('.show').exists()).toBe(true)
  })

})