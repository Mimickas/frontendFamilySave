<template>
    <div class="mt-15 container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="flex text-center justify-center gap-10 flex-col-reverse lg:flex-row">
            <div class="max-w-3xl">
                <div class="my-2">
                    <span class="font-bold text-sm text-[var(--text-secondary)]">
                        APPLICATION NATAO HOAN'NY FIANAKAVIANA, HO AN'NY REHETRA.
                    </span>
                </div>

                <span class="font-bold text-3xl sm:text-5xl lg:text-6xl text-[var(--text-primary)]">
                    Fitantanam-bola
                </span>

                <span class="font-bold text-3xl sm:text-5xl lg:text-6xl text-[var(--text-primary)]">
                    tsotra,mahitsy,azo antoka.
                </span>

                <div class="mt-6 text-base sm:text-lg font-reg text-[var(--text-muted)]">
                    Manampy anao hitahiry sy handamina <br class="hidden sm:block"> ny volanao amin'ny fomba tsotra sy mahomby izahay.
                </div>

                <div class="my-6 flex flex-col sm:flex-row justify-center items-center gap-4">
                    <router-link to="/login">
                        <button class="w-full sm:w-auto
                                border-1
                                border-[var(--color-full-spectrum-blue-500)] 
                                text-[var(--color-full-spectrum-blue-500)] 
                                rounded-xl py-3 px-5
                                hover:bg-[var(--color-full-spectrum-blue-100)]
                                active:bg-[var(--color-full-spectrum-blue-200)]
                                active:scale-95
                                font-reg
                                transition-all duration-200 ease-in-out
                                cursor-pointer">
                            Atomboka izao
                        </button>
                    </router-link>
                    <button class="w-full sm:w-auto
                            bg-[var(--color-full-spectrum-blue-500)] 
                            text-[var(--color-full-spectrum-blue-50)] 
                            rounded-xl py-3 px-5
                            hover:bg-[var(--color-full-spectrum-blue-400)]
                            active:bg-[var(--color-full-spectrum-blue-600)]
                            active:scale-95
                            font-reg
                            transition-all duration-200 ease-in-out
                            cursor-pointer">
                        Mbola tsy fantatra ny momba ny application?
                    </button>
                </div>
            </div>
        </div>
        
        <div class="px-4 sm:px-10 lg:px-20 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 lg:gap-0 mt-16 lg:absolute lg:bottom-5 lg:left-0 lg:right-0">
            
            <div>
                <span class="font-medium text-[var(--text-primary)] text-xl sm:text-2xl">
                    Te hanandrana <br>Ianao nefa tsy<br> mahay?
                </span>

                <hr class="my-4 border-[var(--text-primary)] w-20">

                <span class="font-reg text-sm text-[var(--color-full-spectrum-blue-500)]">
                    Araho fotsiny dingana ao ambany
                    <font-awesome-icon icon="arrow-down" class="ml-2 text-[var(--color-full-spectrum-blue-500)]"/>
                </span>   
            </div>

            <div class="w-full sm:w-70 h-48 sm:h-45 overflow-hidden rounded-xl bg-black relative">
                <div class="absolute z-10 flex items-center justify-center">
                    <span class="font-reg text-white text-sm sm:text-md p-4">
                        Raha toa ka efa vonona anefa ianao dia Manasa anao hitsidika <br class="hidden sm:block"> avy antrany 
                    </span>
                </div>
                <div class="absolute z-10 bottom-0 p-4 flex items-center justify-center">
                    <button class="bg-[var(--color-full-spectrum-blue-500)] 
                            text-[var(--color-full-spectrum-blue-50)] 
                            rounded-xl py-2 px-3
                            hover:bg-[var(--color-full-spectrum-blue-400)]
                            active:bg-[var(--color-full-spectrum-blue-600)]
                            active:scale-95
                            font-reg
                            transition-all duration-200 ease-in-out
                            cursor-pointer">
                        Atomboka izao
                    </button>
                </div>
                <img src="/public/img/7128340dacfe619a31fedb096e80f2fc.jpg" class="w-full h-full object-cover opacity-80 hover:opacity-100" alt="">
            </div>

        </div>
    </div>
</template>