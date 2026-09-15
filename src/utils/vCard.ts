import { personalInfo } from '../data/portfolio'

export function downloadVCard() {
  const vCardContent = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:Jangid;Dev;;;`,
    `FN:${personalInfo.name}`,
    `TITLE:${personalInfo.title}`,
    `EMAIL;TYPE=INTERNET,PREF:${personalInfo.email}`,
    `TEL;TYPE=CELL,VOICE:${personalInfo.phone}`,
    `ADR;TYPE=WORK,PREF:;;Faridabad;Haryana;121005;India`,
    `URL:${personalInfo.linkedin}`,
    `URL;TYPE=GitHub:${personalInfo.github}`,
    `NOTE:Computer Science Engineer specializing in System Maintenance, Network Security Compliance, and Generative AI.`,
    'END:VCARD'
  ].join('\r\n')

  const blob = new Blob([vCardContent], { type: 'text/vcard;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `Dev_Jangid_Contact.vcf`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
