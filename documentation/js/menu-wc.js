'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">server documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Введите для поиска"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Начало работы</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Обзор
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Зависимости
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Свойства
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Модули</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-35b27bb62c55d1045027ac046a86dd587f4047e08d0ac1c98cc5730057b50a158a214e3533378d0c893db8a3e3ec976f670876da77b5c16ceb4ec1a8b4058db3"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-35b27bb62c55d1045027ac046a86dd587f4047e08d0ac1c98cc5730057b50a158a214e3533378d0c893db8a3e3ec976f670876da77b5c16ceb4ec1a8b4058db3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Контроллеры</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-35b27bb62c55d1045027ac046a86dd587f4047e08d0ac1c98cc5730057b50a158a214e3533378d0c893db8a3e3ec976f670876da77b5c16ceb4ec1a8b4058db3"' :
                                            'id="xs-controllers-links-module-AuthModule-35b27bb62c55d1045027ac046a86dd587f4047e08d0ac1c98cc5730057b50a158a214e3533378d0c893db8a3e3ec976f670876da77b5c16ceb4ec1a8b4058db3"' }>
                                            <li class="link">
                                                <a href="controllers/AuthenticationController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthenticationController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-35b27bb62c55d1045027ac046a86dd587f4047e08d0ac1c98cc5730057b50a158a214e3533378d0c893db8a3e3ec976f670876da77b5c16ceb4ec1a8b4058db3"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-35b27bb62c55d1045027ac046a86dd587f4047e08d0ac1c98cc5730057b50a158a214e3533378d0c893db8a3e3ec976f670876da77b5c16ceb4ec1a8b4058db3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Внедрения</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-35b27bb62c55d1045027ac046a86dd587f4047e08d0ac1c98cc5730057b50a158a214e3533378d0c893db8a3e3ec976f670876da77b5c16ceb4ec1a8b4058db3"' :
                                        'id="xs-injectables-links-module-AuthModule-35b27bb62c55d1045027ac046a86dd587f4047e08d0ac1c98cc5730057b50a158a214e3533378d0c893db8a3e3ec976f670876da77b5c16ceb4ec1a8b4058db3"' }>
                                        <li class="link">
                                            <a href="injectables/AuthRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RefreshService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RefreshService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CandidateInterviewModule.html" data-type="entity-link" >CandidateInterviewModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CandidateInterviewModule-f50ad946255444893b3dbdd76190504c97b34853e127ee6ecd57a169dfe82f471dceb5a86160a4302fe1e41ec839188f46a3963f8bab7605bed264dd67a76a99"' : 'data-bs-target="#xs-controllers-links-module-CandidateInterviewModule-f50ad946255444893b3dbdd76190504c97b34853e127ee6ecd57a169dfe82f471dceb5a86160a4302fe1e41ec839188f46a3963f8bab7605bed264dd67a76a99"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Контроллеры</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CandidateInterviewModule-f50ad946255444893b3dbdd76190504c97b34853e127ee6ecd57a169dfe82f471dceb5a86160a4302fe1e41ec839188f46a3963f8bab7605bed264dd67a76a99"' :
                                            'id="xs-controllers-links-module-CandidateInterviewModule-f50ad946255444893b3dbdd76190504c97b34853e127ee6ecd57a169dfe82f471dceb5a86160a4302fe1e41ec839188f46a3963f8bab7605bed264dd67a76a99"' }>
                                            <li class="link">
                                                <a href="controllers/CandidateInterviewController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CandidateInterviewController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CandidateInterviewModule-f50ad946255444893b3dbdd76190504c97b34853e127ee6ecd57a169dfe82f471dceb5a86160a4302fe1e41ec839188f46a3963f8bab7605bed264dd67a76a99"' : 'data-bs-target="#xs-injectables-links-module-CandidateInterviewModule-f50ad946255444893b3dbdd76190504c97b34853e127ee6ecd57a169dfe82f471dceb5a86160a4302fe1e41ec839188f46a3963f8bab7605bed264dd67a76a99"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Внедрения</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CandidateInterviewModule-f50ad946255444893b3dbdd76190504c97b34853e127ee6ecd57a169dfe82f471dceb5a86160a4302fe1e41ec839188f46a3963f8bab7605bed264dd67a76a99"' :
                                        'id="xs-injectables-links-module-CandidateInterviewModule-f50ad946255444893b3dbdd76190504c97b34853e127ee6ecd57a169dfe82f471dceb5a86160a4302fe1e41ec839188f46a3963f8bab7605bed264dd67a76a99"' }>
                                        <li class="link">
                                            <a href="injectables/CandidateInterviewRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CandidateInterviewRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CandidateInterviewService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CandidateInterviewService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EmailModule.html" data-type="entity-link" >EmailModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-EmailModule-56e9df14fd099321ef3aaa8f1d3b5115b48187793d5b8e30bb13e88c087ef36c339bb3a6c4b3db23bebb10f73781e24ee7611796a70aba28ed79900d2306aa47"' : 'data-bs-target="#xs-injectables-links-module-EmailModule-56e9df14fd099321ef3aaa8f1d3b5115b48187793d5b8e30bb13e88c087ef36c339bb3a6c4b3db23bebb10f73781e24ee7611796a70aba28ed79900d2306aa47"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Внедрения</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EmailModule-56e9df14fd099321ef3aaa8f1d3b5115b48187793d5b8e30bb13e88c087ef36c339bb3a6c4b3db23bebb10f73781e24ee7611796a70aba28ed79900d2306aa47"' :
                                        'id="xs-injectables-links-module-EmailModule-56e9df14fd099321ef3aaa8f1d3b5115b48187793d5b8e30bb13e88c087ef36c339bb3a6c4b3db23bebb10f73781e24ee7611796a70aba28ed79900d2306aa47"' }>
                                        <li class="link">
                                            <a href="injectables/EmailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FinalTestModule.html" data-type="entity-link" >FinalTestModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-FinalTestModule-5facf47f47ffe56112095f3031627ba6648b3fe61b873eddc6fac822a5e4bbb9003cc14f89b90d2ea974b0af219309f9e288012bc0e33ec85718f3b967293707"' : 'data-bs-target="#xs-controllers-links-module-FinalTestModule-5facf47f47ffe56112095f3031627ba6648b3fe61b873eddc6fac822a5e4bbb9003cc14f89b90d2ea974b0af219309f9e288012bc0e33ec85718f3b967293707"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Контроллеры</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FinalTestModule-5facf47f47ffe56112095f3031627ba6648b3fe61b873eddc6fac822a5e4bbb9003cc14f89b90d2ea974b0af219309f9e288012bc0e33ec85718f3b967293707"' :
                                            'id="xs-controllers-links-module-FinalTestModule-5facf47f47ffe56112095f3031627ba6648b3fe61b873eddc6fac822a5e4bbb9003cc14f89b90d2ea974b0af219309f9e288012bc0e33ec85718f3b967293707"' }>
                                            <li class="link">
                                                <a href="controllers/FinalTestController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FinalTestController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-FinalTestModule-5facf47f47ffe56112095f3031627ba6648b3fe61b873eddc6fac822a5e4bbb9003cc14f89b90d2ea974b0af219309f9e288012bc0e33ec85718f3b967293707"' : 'data-bs-target="#xs-injectables-links-module-FinalTestModule-5facf47f47ffe56112095f3031627ba6648b3fe61b873eddc6fac822a5e4bbb9003cc14f89b90d2ea974b0af219309f9e288012bc0e33ec85718f3b967293707"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Внедрения</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FinalTestModule-5facf47f47ffe56112095f3031627ba6648b3fe61b873eddc6fac822a5e4bbb9003cc14f89b90d2ea974b0af219309f9e288012bc0e33ec85718f3b967293707"' :
                                        'id="xs-injectables-links-module-FinalTestModule-5facf47f47ffe56112095f3031627ba6648b3fe61b873eddc6fac822a5e4bbb9003cc14f89b90d2ea974b0af219309f9e288012bc0e33ec85718f3b967293707"' }>
                                        <li class="link">
                                            <a href="injectables/FinalTestService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FinalTestService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/InterviewModule.html" data-type="entity-link" >InterviewModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-InterviewModule-5ced3c03b2d34b8038aa5184d431589ae82ef5c12464882f0b486ddb43da50861fe973022baf8e3a01d0679a3f076f348e0c22d5db63afa12f1c3ead81ecfe5e"' : 'data-bs-target="#xs-controllers-links-module-InterviewModule-5ced3c03b2d34b8038aa5184d431589ae82ef5c12464882f0b486ddb43da50861fe973022baf8e3a01d0679a3f076f348e0c22d5db63afa12f1c3ead81ecfe5e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Контроллеры</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-InterviewModule-5ced3c03b2d34b8038aa5184d431589ae82ef5c12464882f0b486ddb43da50861fe973022baf8e3a01d0679a3f076f348e0c22d5db63afa12f1c3ead81ecfe5e"' :
                                            'id="xs-controllers-links-module-InterviewModule-5ced3c03b2d34b8038aa5184d431589ae82ef5c12464882f0b486ddb43da50861fe973022baf8e3a01d0679a3f076f348e0c22d5db63afa12f1c3ead81ecfe5e"' }>
                                            <li class="link">
                                                <a href="controllers/InterviewController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InterviewController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-InterviewModule-5ced3c03b2d34b8038aa5184d431589ae82ef5c12464882f0b486ddb43da50861fe973022baf8e3a01d0679a3f076f348e0c22d5db63afa12f1c3ead81ecfe5e"' : 'data-bs-target="#xs-injectables-links-module-InterviewModule-5ced3c03b2d34b8038aa5184d431589ae82ef5c12464882f0b486ddb43da50861fe973022baf8e3a01d0679a3f076f348e0c22d5db63afa12f1c3ead81ecfe5e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Внедрения</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-InterviewModule-5ced3c03b2d34b8038aa5184d431589ae82ef5c12464882f0b486ddb43da50861fe973022baf8e3a01d0679a3f076f348e0c22d5db63afa12f1c3ead81ecfe5e"' :
                                        'id="xs-injectables-links-module-InterviewModule-5ced3c03b2d34b8038aa5184d431589ae82ef5c12464882f0b486ddb43da50861fe973022baf8e3a01d0679a3f076f348e0c22d5db63afa12f1c3ead81ecfe5e"' }>
                                        <li class="link">
                                            <a href="injectables/InterviewRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InterviewRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/InterviewService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InterviewService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/JwtModule.html" data-type="entity-link" >JwtModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-JwtModule-060854c2a0d542ca5b4c3f0146d81ab91c90f219781b9ae0c3cc8b5b810149f45b5d7893280e8bc1a98ddf485e94be2481bc4553741f70974ca6562e632e3461"' : 'data-bs-target="#xs-injectables-links-module-JwtModule-060854c2a0d542ca5b4c3f0146d81ab91c90f219781b9ae0c3cc8b5b810149f45b5d7893280e8bc1a98ddf485e94be2481bc4553741f70974ca6562e632e3461"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Внедрения</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-JwtModule-060854c2a0d542ca5b4c3f0146d81ab91c90f219781b9ae0c3cc8b5b810149f45b5d7893280e8bc1a98ddf485e94be2481bc4553741f70974ca6562e632e3461"' :
                                        'id="xs-injectables-links-module-JwtModule-060854c2a0d542ca5b4c3f0146d81ab91c90f219781b9ae0c3cc8b5b810149f45b5d7893280e8bc1a98ddf485e94be2481bc4553741f70974ca6562e632e3461"' }>
                                        <li class="link">
                                            <a href="injectables/JwtService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostgresModule.html" data-type="entity-link" >PostgresModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostgresModule-11611d1bca621e53020924808f97a0af12a3c4c68547eb5b94f8b7d9b25542170c4c398941d87545e32a18275a93d942b7a075c7543e82807264bf4d1b135eba"' : 'data-bs-target="#xs-injectables-links-module-PostgresModule-11611d1bca621e53020924808f97a0af12a3c4c68547eb5b94f8b7d9b25542170c4c398941d87545e32a18275a93d942b7a075c7543e82807264bf4d1b135eba"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Внедрения</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostgresModule-11611d1bca621e53020924808f97a0af12a3c4c68547eb5b94f8b7d9b25542170c4c398941d87545e32a18275a93d942b7a075c7543e82807264bf4d1b135eba"' :
                                        'id="xs-injectables-links-module-PostgresModule-11611d1bca621e53020924808f97a0af12a3c4c68547eb5b94f8b7d9b25542170c4c398941d87545e32a18275a93d942b7a075c7543e82807264bf4d1b135eba"' }>
                                        <li class="link">
                                            <a href="injectables/PostgresService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostgresService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/QuestionModule.html" data-type="entity-link" >QuestionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-QuestionModule-96352d38bb34ef5408dd649c9c99b93aaf2d94eabd100f036cfe740d4838a3997283bc3054c6bb5a32e2a36b5cb06d19b4a6b16d55e288406bfcbeff91b51acd"' : 'data-bs-target="#xs-controllers-links-module-QuestionModule-96352d38bb34ef5408dd649c9c99b93aaf2d94eabd100f036cfe740d4838a3997283bc3054c6bb5a32e2a36b5cb06d19b4a6b16d55e288406bfcbeff91b51acd"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Контроллеры</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-QuestionModule-96352d38bb34ef5408dd649c9c99b93aaf2d94eabd100f036cfe740d4838a3997283bc3054c6bb5a32e2a36b5cb06d19b4a6b16d55e288406bfcbeff91b51acd"' :
                                            'id="xs-controllers-links-module-QuestionModule-96352d38bb34ef5408dd649c9c99b93aaf2d94eabd100f036cfe740d4838a3997283bc3054c6bb5a32e2a36b5cb06d19b4a6b16d55e288406bfcbeff91b51acd"' }>
                                            <li class="link">
                                                <a href="controllers/QuestionController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >QuestionController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-QuestionModule-96352d38bb34ef5408dd649c9c99b93aaf2d94eabd100f036cfe740d4838a3997283bc3054c6bb5a32e2a36b5cb06d19b4a6b16d55e288406bfcbeff91b51acd"' : 'data-bs-target="#xs-injectables-links-module-QuestionModule-96352d38bb34ef5408dd649c9c99b93aaf2d94eabd100f036cfe740d4838a3997283bc3054c6bb5a32e2a36b5cb06d19b4a6b16d55e288406bfcbeff91b51acd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Внедрения</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-QuestionModule-96352d38bb34ef5408dd649c9c99b93aaf2d94eabd100f036cfe740d4838a3997283bc3054c6bb5a32e2a36b5cb06d19b4a6b16d55e288406bfcbeff91b51acd"' :
                                        'id="xs-injectables-links-module-QuestionModule-96352d38bb34ef5408dd649c9c99b93aaf2d94eabd100f036cfe740d4838a3997283bc3054c6bb5a32e2a36b5cb06d19b4a6b16d55e288406bfcbeff91b51acd"' }>
                                        <li class="link">
                                            <a href="injectables/QuestionRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >QuestionRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/QuestionService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >QuestionService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RedisModule.html" data-type="entity-link" >RedisModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RedisModule-40bd4689bc7e5feb1cadd5e95023706e3f3806151b2926364ef5ef64d12dbc01ec29dddcefb57894304ffaa36e2631d7e57e33fa1dd6259901f748a2e8d4b8a0"' : 'data-bs-target="#xs-injectables-links-module-RedisModule-40bd4689bc7e5feb1cadd5e95023706e3f3806151b2926364ef5ef64d12dbc01ec29dddcefb57894304ffaa36e2631d7e57e33fa1dd6259901f748a2e8d4b8a0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Внедрения</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RedisModule-40bd4689bc7e5feb1cadd5e95023706e3f3806151b2926364ef5ef64d12dbc01ec29dddcefb57894304ffaa36e2631d7e57e33fa1dd6259901f748a2e8d4b8a0"' :
                                        'id="xs-injectables-links-module-RedisModule-40bd4689bc7e5feb1cadd5e95023706e3f3806151b2926364ef5ef64d12dbc01ec29dddcefb57894304ffaa36e2631d7e57e33fa1dd6259901f748a2e8d4b8a0"' }>
                                        <li class="link">
                                            <a href="injectables/RedisService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RedisService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ResponseBuilderModule.html" data-type="entity-link" >ResponseBuilderModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ResponseBuilderModule-dcb18d063da882734620a6565010ae3bffa62a0950e11fdbb6da23a887e55ca3be7d8fb956e995023f7fba39f89139bcbfc7d9761068aa66378e74622c171541"' : 'data-bs-target="#xs-injectables-links-module-ResponseBuilderModule-dcb18d063da882734620a6565010ae3bffa62a0950e11fdbb6da23a887e55ca3be7d8fb956e995023f7fba39f89139bcbfc7d9761068aa66378e74622c171541"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Внедрения</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ResponseBuilderModule-dcb18d063da882734620a6565010ae3bffa62a0950e11fdbb6da23a887e55ca3be7d8fb956e995023f7fba39f89139bcbfc7d9761068aa66378e74622c171541"' :
                                        'id="xs-injectables-links-module-ResponseBuilderModule-dcb18d063da882734620a6565010ae3bffa62a0950e11fdbb6da23a887e55ca3be7d8fb956e995023f7fba39f89139bcbfc7d9761068aa66378e74622c171541"' }>
                                        <li class="link">
                                            <a href="injectables/ResponseBuildService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResponseBuildService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SessionModule.html" data-type="entity-link" >SessionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SessionModule-52c11155085ddd533872d4cef67361dea57bdf68d83edb834b5b33db3710ed7165efd98d40227c508e2015efdc15f7e1cc8ed5e100c9c20627fe42f4082f1570"' : 'data-bs-target="#xs-controllers-links-module-SessionModule-52c11155085ddd533872d4cef67361dea57bdf68d83edb834b5b33db3710ed7165efd98d40227c508e2015efdc15f7e1cc8ed5e100c9c20627fe42f4082f1570"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Контроллеры</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SessionModule-52c11155085ddd533872d4cef67361dea57bdf68d83edb834b5b33db3710ed7165efd98d40227c508e2015efdc15f7e1cc8ed5e100c9c20627fe42f4082f1570"' :
                                            'id="xs-controllers-links-module-SessionModule-52c11155085ddd533872d4cef67361dea57bdf68d83edb834b5b33db3710ed7165efd98d40227c508e2015efdc15f7e1cc8ed5e100c9c20627fe42f4082f1570"' }>
                                            <li class="link">
                                                <a href="controllers/SessionController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SessionController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SessionModule-52c11155085ddd533872d4cef67361dea57bdf68d83edb834b5b33db3710ed7165efd98d40227c508e2015efdc15f7e1cc8ed5e100c9c20627fe42f4082f1570"' : 'data-bs-target="#xs-injectables-links-module-SessionModule-52c11155085ddd533872d4cef67361dea57bdf68d83edb834b5b33db3710ed7165efd98d40227c508e2015efdc15f7e1cc8ed5e100c9c20627fe42f4082f1570"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Внедрения</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SessionModule-52c11155085ddd533872d4cef67361dea57bdf68d83edb834b5b33db3710ed7165efd98d40227c508e2015efdc15f7e1cc8ed5e100c9c20627fe42f4082f1570"' :
                                        'id="xs-injectables-links-module-SessionModule-52c11155085ddd533872d4cef67361dea57bdf68d83edb834b5b33db3710ed7165efd98d40227c508e2015efdc15f7e1cc8ed5e100c9c20627fe42f4082f1570"' }>
                                        <li class="link">
                                            <a href="injectables/SessionRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SessionRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SessionService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SessionService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TaskModule.html" data-type="entity-link" >TaskModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TaskModule-a1bd220cb7e1ab93b382a3758c741e8f3be2f58de9041f466358617f057fa1399d041235f87759710cac188732fcc81f1983793b8abeb1ca6b4639b60d249e43"' : 'data-bs-target="#xs-controllers-links-module-TaskModule-a1bd220cb7e1ab93b382a3758c741e8f3be2f58de9041f466358617f057fa1399d041235f87759710cac188732fcc81f1983793b8abeb1ca6b4639b60d249e43"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Контроллеры</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TaskModule-a1bd220cb7e1ab93b382a3758c741e8f3be2f58de9041f466358617f057fa1399d041235f87759710cac188732fcc81f1983793b8abeb1ca6b4639b60d249e43"' :
                                            'id="xs-controllers-links-module-TaskModule-a1bd220cb7e1ab93b382a3758c741e8f3be2f58de9041f466358617f057fa1399d041235f87759710cac188732fcc81f1983793b8abeb1ca6b4639b60d249e43"' }>
                                            <li class="link">
                                                <a href="controllers/TaskController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TaskModule-a1bd220cb7e1ab93b382a3758c741e8f3be2f58de9041f466358617f057fa1399d041235f87759710cac188732fcc81f1983793b8abeb1ca6b4639b60d249e43"' : 'data-bs-target="#xs-injectables-links-module-TaskModule-a1bd220cb7e1ab93b382a3758c741e8f3be2f58de9041f466358617f057fa1399d041235f87759710cac188732fcc81f1983793b8abeb1ca6b4639b60d249e43"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Внедрения</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TaskModule-a1bd220cb7e1ab93b382a3758c741e8f3be2f58de9041f466358617f057fa1399d041235f87759710cac188732fcc81f1983793b8abeb1ca6b4639b60d249e43"' :
                                        'id="xs-injectables-links-module-TaskModule-a1bd220cb7e1ab93b382a3758c741e8f3be2f58de9041f466358617f057fa1399d041235f87759710cac188732fcc81f1983793b8abeb1ca6b4639b60d249e43"' }>
                                        <li class="link">
                                            <a href="injectables/TaskRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TaskService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Контроллеры</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AuthenticationController.html" data-type="entity-link" >AuthenticationController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CandidateInterviewController.html" data-type="entity-link" >CandidateInterviewController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/FinalTestController.html" data-type="entity-link" >FinalTestController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/InterviewController.html" data-type="entity-link" >InterviewController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/QuestionController.html" data-type="entity-link" >QuestionController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SessionController.html" data-type="entity-link" >SessionController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TaskController.html" data-type="entity-link" >TaskController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Классы</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AddTasksDto.html" data-type="entity-link" >AddTasksDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ApiError.html" data-type="entity-link" >ApiError</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCandidateInterviewDto.html" data-type="entity-link" >CreateCandidateInterviewDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateFinalTestDto.html" data-type="entity-link" >CreateFinalTestDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateInterviewDto.html" data-type="entity-link" >CreateInterviewDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateQuestionWithGroupDto.html" data-type="entity-link" >CreateQuestionWithGroupDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSessionDto.html" data-type="entity-link" >CreateSessionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTaskDto.html" data-type="entity-link" >CreateTaskDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FilterSessionsDto.html" data-type="entity-link" >FilterSessionsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FinalTestRepository.html" data-type="entity-link" >FinalTestRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ParticipantDto.html" data-type="entity-link" >ParticipantDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/QuestionDto.html" data-type="entity-link" >QuestionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterDto.html" data-type="entity-link" >RegisterDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SessionGateway.html" data-type="entity-link" >SessionGateway</a>
                            </li>
                            <li class="link">
                                <a href="classes/StartSessionDto.html" data-type="entity-link" >StartSessionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskGateway.html" data-type="entity-link" >TaskGateway</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Внедрения</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthRepository.html" data-type="entity-link" >AuthRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CandidateInterviewRepository.html" data-type="entity-link" >CandidateInterviewRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CandidateInterviewService.html" data-type="entity-link" >CandidateInterviewService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmailService.html" data-type="entity-link" >EmailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FinalTestService.html" data-type="entity-link" >FinalTestService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InterviewRepository.html" data-type="entity-link" >InterviewRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InterviewService.html" data-type="entity-link" >InterviewService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtService.html" data-type="entity-link" >JwtService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PostgresService.html" data-type="entity-link" >PostgresService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/QuestionRepository.html" data-type="entity-link" >QuestionRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/QuestionService.html" data-type="entity-link" >QuestionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RedisService.html" data-type="entity-link" >RedisService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RefreshService.html" data-type="entity-link" >RefreshService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResponseBuildService.html" data-type="entity-link" >ResponseBuildService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SessionRepository.html" data-type="entity-link" >SessionRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SessionService.html" data-type="entity-link" >SessionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TaskRepository.html" data-type="entity-link" >TaskRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TaskService.html" data-type="entity-link" >TaskService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Защитники</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Интерфейсы</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IData.html" data-type="entity-link" >IData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGenerateTokens.html" data-type="entity-link" >IGenerateTokens</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILogin.html" data-type="entity-link" >ILogin</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IResponseBuild.html" data-type="entity-link" >IResponseBuild</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUser.html" data-type="entity-link" >IUser</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Разное</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Функции</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Переменные</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Покрытие документацией</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Документация создана с помощью <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});