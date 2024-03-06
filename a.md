<FormKit
      type="multi-step"
      id="multi-step"
      name="multi-step"
      tab-style="tab"
      outer-class="max-w-none"
      steps-class="border-none !p-0"
    >
<template #tabs></template>

      <FormKit
        type="step"
        name="accreditation"
      >
        <div class="flex gap-4">
          <div class="w-1/2">
            <h2 class="divider divider-start text-xl font-bold">Datos Personales</h2>

            <div class="grid grid-cols-2 gap-4">
              <FormKit
                type="text"
                name="firstName"
                label="Nombre"
                maxlength="150"
                validation="required"
              />

              <FormKit
                type="text"
                name="lastName"
                label="Apellido"
                maxlength="150"
                validation="required"
              />
            </div>

            <FormKit
              type="text"
              name="passport"
              label="Cédula"
              validation="required"
            />

            <div class="grid grid-cols-4 gap-4">
              <FormKit
                type="text"
                name="birthplace"
                label="Lugar de Nacimiento"
                validation="required"
                outer-class="col-span-3"
              />

              <FormKit
                type="date"
                name="birthday"
                label="Fecha de Nacimiento"
                validation="required"
              />
            </div>

            <div class="grid grid-cols-4 gap-4">
              <FormKit
                type="select"
                name="blood"
                label="Tipo de Sangre"
                validation="required"
                :options="bloods"
                select-icon="down"
              />
            </div>

            <h2 class="divider divider-start text-xl font-bold">Cargo en el Evento</h2>

            <div
              class="grid gap-4"
              :class="{
                'grid-cols-1': subPositions.length === 0,
                'grid-cols-2': subPositions.length !== 0,
              }"
            >
              <FormKit
                type="select"
                name="position"
                label="Posición"
                validation="required"
                :options="positions"
                select-icon="down"
              />

              <FormKit
                v-if="subPositions.length !== 0"
                type="select"
                name="subPosition"
                label="Tipo de Cargo"
                validation="required"
                :options="subPositions"
                select-icon="down"
              />
            </div>

            <FormKit
              v-if="showChannels"
              type="select"
              name="channel"
              label="Medio de Comunicación"
              validation="required"
              :options="channels"
              select-icon="down"
            />

            <h2
              class="divider divider-start text-xl font-bold"
              :class="{ 'mt-6': showChannels }"
            >
              Datos de Contacto
            </h2>

            <FormKit
              type="text"
              name="institution"
              label="Institución/Empresa"
              validation="required"
            />

            <FormKit
              type="text"
              name="address"
              label="Dirección"
              validation="required"
            />

            <div class="grid grid-cols-2 gap-4">
              <FormKit
                type="text"
                name="phoneNumber"
                label="Teléfono"
                validation="required"
              />

              <FormKit
                type="text"
                name="phoneNumber2"
                label="Teléfono Alternativo (Opcional)"
              />
            </div>

            <FormKit
              type="email"
              name="email"
              label="Correo Electrónico"
              validation="required|email"
            />

            <h2 class="divider divider-start mt-10 text-xl font-bold">Otros</h2>

            <FormKit
              type="select"
              name="type"
              label="Tipo de acreditación"
              validation="required"
              :options="nationalTypes"
              select-icon="down"
            />
          </div>

          <div class="flex-1"></div>

          <div class="flex w-1/4 flex-col gap-4">
            <div>
              <FormKit
                type="file"
                name="image"
                label="Foto Personal"
                validation="required"
                accept=".png,.jpg,.webp"
                file-item-icon="fileDoc"
                file-remove-icon="close"
                no-files-icon="fileDoc"
              />

              <div class="card mb-4">
                <img
                  :src="previewImage"
                  alt="Foto"
                  class="h-[350px] w-full rounded-md bg-base-200 object-contain"
                />
              </div>
            </div>

            <div v-if="showChannels">
              <FormKit
                type="file"
                name="letter"
                label="Carta de Autorización"
                validation="required"
                accept=".pdf"
                file-item-icon="fileDoc"
                file-remove-icon="close"
                no-files-icon="fileDoc"
              />

              <!-- <div class="card mb-4">
                <img
                  :src="previewLetter"
                  alt="Foto"
                  class="h-[350px] w-full rounded-md bg-base-200 object-contain"
                />
              </div> -->
            </div>
          </div>
        </div>

        <template #stepActions>
          <div class="flex gap-4">
            <FormKit
              v-if="!isSecurity"
              type="submit"
              label="Crear"
              suffix-icon="submit"
              outer-class="!max-w-fit"
            />

            <FormKit
              v-else
              type="button"
              label="Siguiente"
              outer-class="!max-w-fit"
              @click="next"
            />
          </div>
        </template>
      </FormKit>

      <FormKit
        type="step"
        name="security"
      >
        <div class="w-1/2">
          <h2 class="divider divider-start text-xl font-bold">Datos de Seguridad</h2>

          <FormKit
            type="text"
            name="securityCode"
            label="Código de Seguridad"
            validation="required"
          />

          <FormKit
            type="text"
            name="securityInstitution"
            label="Institución de Seguridad"
            validation="required"
          />

          <FormKit
            type="text"
            name="securityInstitutionAddress"
            label="Dirección de la Institución"
            validation="required"
          />

          <FormKit
            type="text"
            name="securityInstitutionPhoneNumber"
            label="Teléfono de la Institución"
            validation="required"
          />

          <FormKit
            type="text"
            name="securityInstitutionEmail"
            label="Correo Electrónico de la Institución"
            validation="required|email"
          />
        </div>

        <template #stepActions>
          <div class="flex gap-4">
            <FormKit
              type="button"
              label="Anterior"
              outer-class="!max-w-fit"
              @click="previous"
            />

            <FormKit
              type="submit"
              label="Crear"
              suffix-icon="submit"
              outer-class="!max-w-fit"
            />
          </div>
        </template>
      </FormKit>
    </FormKit>
